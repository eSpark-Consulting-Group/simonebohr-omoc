import { RequestHandler } from 'express';
import { ICustomRequest, IOrderSummary, IOrders } from '../interfaces';
import { HTTP_STATUS, ORDER_STATUS, PAGINATION, PAYMENT_INTENT_STATUS } from '../constants';
import { handleResponse, logger } from '../utils';
import { Carts, OrderSummary, Orders, ProductReviews, ProductVariants, UserAddress } from '../models';
import { Products } from '../models/products.model';
import { BadRequestError, NotFoundError, PaymentError } from '../errors';
import { orderHelper, stripeHelper } from '../helpers';
import { Types } from 'mongoose';

class OrdersController {
  placeOrder: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { products, addressId, paymentType, deliveryType, transactionId, isPaid, paymentId } = req?.body;

      const checkAddress = await UserAddress.findOne({ _id: addressId, userId: userDetails?.id, isActive: true });
      if (!checkAddress) {
        throw new NotFoundError('Address not found');
      }
      const ordersSummaryData: IOrderSummary = {
        userId: userDetails?.id as string,
        addressId,
        deliveryType,
        paymentType,
        transactionId,
        totalAmount: 0,
        totalItems: 0,
        isPaid,
      };
      const orderSummaryCreated = await OrderSummary.create(ordersSummaryData);
      const orders = [];
      const productsIds: string[] = [];
      for (const data of products) {
        const productFound = await Products.findOne({ _id: data?.productId });
        if (!productFound) {
          await orderSummaryCreated.deleteOne();
          throw new NotFoundError('Products not found');
        }

        const ordersData: IOrders = {
          amount: productFound?.price * data?.quantity,
          orderId: orderSummaryCreated?.id,
          productId: productFound?.id,
          quantity: data?.quantity,
          status: ORDER_STATUS.INITIATED,
        };
        productsIds.push(productFound?.id);
        if (data?.variantId) {
          const variantFound = await ProductVariants.findOne({ id: data?.variantId });
          ordersData.amount = (variantFound?.price ?? 0) * data?.quantity || ordersData?.amount;
          ordersData.variantId = data?.variantId;
        }
        orderSummaryCreated.totalItems += data?.quantity;
        orderSummaryCreated.totalAmount += ordersData?.amount;
        orders.push(ordersData);
      }

      if (paymentId) {
        const { userAccount } = await stripeHelper.getUserStripeAccount(userDetails?.id as string, userDetails?.role as any);
        const userPayment = userAccount?.cards?.find(cardData => cardData?.paymentId === paymentId);

        if (!userPayment) {
          throw new BadRequestError('Payment Id not attached to customer');
        }
        const payment = await stripeHelper.makePayment({
          amount: orderSummaryCreated?.totalAmount,
          customerId: userAccount?.stripeCustomerId,
          paymentId,
        });
        if (payment?.status !== PAYMENT_INTENT_STATUS.SUCCEEDED) {
          throw new PaymentError(`Payment Failed With status ${payment?.status}`);
        }
      }
      const promise: any = [
        Orders.insertMany(orders),
        orderSummaryCreated.save(),

        Carts.deleteMany({
          productId: {
            $in: productsIds,
          },
        }),
      ];
      await Promise.all(promise);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Order Placed Successfully'));
    } catch (err) {
      logger.error(`OrdersController :: placeOrder :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getUsersOrders: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;

      const orderSummary = await OrderSummary.find({ userId: userDetails?.id }).select('_id');

      const orderSummaryIds = orderSummary?.map(order => order?.id);
      const orders = await Orders.find({
        orderId: {
          $in: orderSummaryIds,
        },
      })
        .populate({
          path: 'productId',
          populate: {
            path: 'addedBy',
          },
        })
        .limit(+pageSize)
        .skip(+page)
        .lean();
      const orderIds = orders?.map(order => new Types.ObjectId(order?._id));
      const reviews = await ProductReviews.find({
        userId: userDetails?.id,
        orderId: {
          $in: orderIds,
        },
      })
        .lean()
        .select('_id rating comment orderId productId');
      const prepareResponse = orderHelper.prepareUserOrderResponse(orders, reviews);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Orders Found', prepareResponse));
    } catch (err) {
      logger.error(`OrdersController :: getUsersOrders :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}
export const ordersController = new OrdersController();
