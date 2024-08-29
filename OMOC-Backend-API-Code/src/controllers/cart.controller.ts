import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { HTTP_STATUS, MODEL_NAMES, OPERATION } from '../constants';
import { BusinessInfos, Carts, UserInfos } from '../models';
import { ApiError, BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors';
import { Products } from '../models/products.model';
import { cartHelper } from '../helpers';
import { Types, isValidObjectId } from 'mongoose';

class CartController {
  addToCart: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { productId, quantity, variantId, note } = req?.body;

      const productFound = await Products.findOne({ _id: productId });

      if (!productFound) {
        throw new ApiError('Product Not Found', HTTP_STATUS.NOT_FOUND);
      }
      const productFoundInCart = await Carts.findOne({ productId, userId: userDetails?.id });

      if (productFoundInCart) {
        productFoundInCart.quantity = quantity ?? 1;
      } else {
        await Carts.create({ productId, quantity: quantity ?? 1, userId: userDetails?.id, variantId, shopId: productFound?.addedBy, note });
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Products has been Added To Carts'));
    } catch (err) {
      logger.error(`CartController :: addToCart :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getCartData: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { countOnly } = req?.query;

      const count = await Carts.countDocuments({ userId: userDetails?.id });
      const response: any = {
        count,
      };
      if (!countOnly) {
        const cartList = await Carts.find({ userId: userDetails?.id }).populate({
          path: 'productId',
          populate: {
            path: 'addedBy',
            model: MODEL_NAMES.BUSINESS_INFO,
          },
        });

        cartHelper.prepareCartListResponse(response, cartList);
        response.cartList = cartList;
      }
      const userInfos = await UserInfos.findOne({ userId: userDetails?.id });
      response.isTourCompleted = !!userInfos?.isTourCompleted;
      return res.status(HTTP_STATUS.OK).json(handleResponse('Data Found', response));
    } catch (err) {
      logger.error(`CartController :: getCartData :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  removeFromCart: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { productIds } = req?.body;
      const where = { userId: userDetails?.id, productId: productIds?.map((id: string) => new Types.ObjectId(id)) };

      const cartData = await Carts.deleteMany(where);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Removed From Cart', { deletedCount: cartData?.deletedCount ?? 0 }));
    } catch (err) {
      logger.error(`CartController :: removeFromCart :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  incrementDecrementItem: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const productId = req?.params?.id;
      if (!isValidObjectId(productId)) {
        throw new UnprocessableEntityError('enter valid id');
      }
      const value = req?.query?.value;
      const quantity = +(req?.query as any)?.quantity || 1;
      const cartData = await Carts.findOne({ userId: userDetails?.id, productId });
      if (!cartData) {
        throw new NotFoundError('Product Not found in user Cart');
      }
      if (value === OPERATION.INCREMENT) {
        cartData.quantity += quantity;
      }
      if (value === OPERATION.DECREMENT) {
        cartData.quantity -= quantity;
        if (cartData.quantity < 0) {
          throw new BadRequestError('Value can not be below than zero');
        }
      }
      await cartData.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse(`${value} has done successfully`, cartData));
    } catch (err) {
      logger.error(`CartController :: incrementDecrementItem :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  editCartData: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { productIds } = req?.body;
      const bulkUpdateData: any[] = [];
      productIds.forEach(function (data: { id: string; quantity: number; note: string }) {
        bulkUpdateData.push({
          updateOne: {
            filter: { productId: new Types.ObjectId(data?.id), userId: userDetails?.id },
            update: { $set: { quantity: data?.quantity, ...(data?.note && { note: data?.note }) } },
          },
        });
      });
      const response = await Carts.bulkWrite(bulkUpdateData);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Data Found', response));
    } catch (err) {
      logger.error(`CartController :: editCartData :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  markTourCompleted: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const userInfos = await UserInfos.findOne({ userId: userDetails?.id });
      if (userInfos && !userInfos?.isTourCompleted) {
        userInfos.isTourCompleted = true;
        await userInfos.save();
      } else {
        await UserInfos.create({
          userId: userDetails?.id,
          isTourCompleted: true,
        });
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Tour completed successfully'));
    } catch (err) {
      logger.error(`CartController :: markTourCompleted :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const cartController = new CartController();
