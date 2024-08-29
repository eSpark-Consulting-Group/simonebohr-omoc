import { NextFunction, RequestHandler, Response } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest, IProducts } from '../interfaces';
import { HTTP_STATUS, ORDER_STATUS, PAGINATION } from '../constants';
import { BusinessInfos, Orders } from '../models';
import { Products } from '../models/products.model';
import { BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors';
import { isValidObjectId } from 'mongoose';

class DashboardController {
  getDashBoardData: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const products = await Products.find({ addedBy: userDetails?.shopId }).select('_id');
      const productIds = products?.map(product => product?.id);
      const orders = await Orders.find({
        productId: {
          $in: productIds,
        },
      }).select('_id');
      const dashboardData = {
        newOrders: orders?.length ?? 0,
        newChat: 0,
        shippedProducts: 0,
        delivered: 0,
        productDiscussions: 0,
        customerReviews: 0,
      };
      const shopsList = await BusinessInfos.find({ userId: userDetails?.id });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Data Found', { dashboardData, shopsList }));
    } catch (err) {
      logger.error(`DashboardController :: getDashBoardData :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getSellersOrdersList: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0, status } = req?.query;
      const products = await Products.find({ addedBy: userDetails?.shopId }).select('_id');

      const productIds = products?.map(product => product?.id);

      const orders = await Orders.find({
        productId: {
          $in: productIds,
        },
        ...(status && { status }),
      })
        .populate({
          path: 'orderId',
          populate: [
            {
              path: 'addressId',
            },
            {
              path: 'userId',
            },
          ],
        })
        .populate('productId')
        .limit(+pageSize)
        .skip(+page);

      const response = orders?.length
        ? orders?.map((order: any) => ({
          userName: order.orderId?.userId?.name ?? '',
          userEmail: order.orderId?.userId?.email ?? '',
          orderDetails: {
            orderDate: order?.orderId?.orderedOn ?? '',
            orderId: order?.id,
            quantity: order?.quantity,
            totalAmount: (order?.productId?.price ?? 0) * (order?.quantity ?? 0),
            orderStatus: order?.status ?? null,
            isPaid: order?.orderId?.isPaid,
          },
          userAddress: order?.orderId?.addressId,
          productDetails: order?.productId,
          courierDetails: order?.courierId ?? {
            name: 'DHL Express',
            shippingCharge: 20,
            _id: '65bc7895bcd9df85489028cc',
          },
        }))
        : [];
      return res.status(HTTP_STATUS.OK).json(handleResponse('Data Found', response));
    } catch (err) {
      logger.error(`DashboardController :: getOrdersList :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  fulFillOrder = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const userDetails = req?.user;
      const { orderId } = req?.body;

      if (!orderId || !isValidObjectId(orderId)) {
        throw new UnprocessableEntityError('validate orderId');
      }

      const orderFound = await Orders.findOne({
        _id: orderId,
      }).populate({ path: 'productId' })

      if (!orderFound || (orderFound.productId as any)?.addedBy.toString() != userDetails?.shopId) {
        throw new NotFoundError('Order Not Found');
      }

      if (orderFound?.status != ORDER_STATUS.INITIATED) {
        throw new BadRequestError('Order can not be changed to fulfill from current status')
      }

      orderFound.status = ORDER_STATUS.FULFILLED;

      const productFound = await Products.findOne({
        _id: (orderFound?.productId as any)?._id,
        addedBy: (orderFound?.productId as any)?.addedBy
      })

      if (productFound && productFound?.quantity) {
        if (productFound?.quantity < orderFound?.quantity) {
          throw new BadRequestError('Order can not be placed as product quantity is less than order quantity')
        }

        productFound.quantity -= orderFound?.quantity;
        await productFound?.save();
      };

      await orderFound.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Product Status has been updated SuccessFully'));
    } catch (err: unknown) {
      logger.error(`DashboardController :: fulFillOrder :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}
export const dashboardController = new DashboardController();
