import { RequestHandler } from 'express';
import { HTTP_STATUS, PAGINATION } from '../constants';
import { calculateIsNext, handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { ShopShippings } from '../models';
import { AlreadyExistsError, NotFoundError } from '../errors';
import { isValidObjectId } from 'mongoose';
import { commonHelper } from '../helpers';
import { DEFAULT_SHIPPING_TIMES, ESTIMATED_TIME, GERMANY_REGIONS } from '../constants/constant';

// Shipping controller
class ShopShippingsController {
  createShopShipping: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { region, tax, shippingRange, minPrince, wareHouseId } = req?.body;
      const shippingFound = await ShopShippings.findOne({
        region,
        shopId: userDetails?.shopId,
        isDeleted: false,
      });
      const shippingTimes = (ESTIMATED_TIME as any)[shippingRange] || ESTIMATED_TIME;

      if (shippingFound) {
        throw new AlreadyExistsError('Shipping already exists with this name');
      }
      const created = await ShopShippings.create({
        region,
        tax,
        minShippingTime: shippingTimes?.minShippingTime,
        maxShippingTime: shippingTimes?.maxShippingTime,
        minPrince,
        wareHouseId,
        shopId: userDetails?.shopId,
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Shipping has been created', created));
    } catch (err) {
      logger.error(`ShopShippingsController :: createShopShipping :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllShopShippings: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;
      const region = req?.query?.region;

      const where: any = {
        ...(region && { region: { $regex: '.*' + region + '.*' } }),
        shopId: userDetails?.shopId,
        isDeleted: false,
      };
      const shippingFound = await ShopShippings.find(where).limit(+pageSize).skip(+page);

      const count = await ShopShippings.countDocuments(where);

      return res
        .status(HTTP_STATUS.OK)
        .json(handleResponse('Shippings found', { shippings: shippingFound, count, isNext: calculateIsNext(count, +page, +pageSize) }));
    } catch (err) {
      logger.error(`ShopShippingsController :: getAllShopShippings :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteShopShippings: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const shippingId = req?.params?.shippingId;

      if (!isValidObjectId(shippingId)) {
        throw new NotFoundError('shipping not found');
      }

      const shippingFound = await ShopShippings.findOne({
        shopId: userDetails?.shopId,
        isDeleted: false,
        _id: shippingId,
      });

      if (!shippingFound) {
        throw new NotFoundError('shipping not found');
      }
      shippingFound.isDeleted = true;
      await shippingFound?.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Delete Shippings'));
    } catch (err) {
      logger.error(`ShopShippingsController :: deleteShopShippings :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateShopShippings: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const shippingId = req?.params?.shippingId;

      if (!isValidObjectId(shippingId)) {
        throw new NotFoundError('shipping not found');
      }

      const shippingFound = await ShopShippings.findOne({
        shopId: userDetails?.shopId,
        isDeleted: false,
        _id: shippingId,
      });

      if (!shippingFound) {
        throw new NotFoundError('shipping not found');
      }
      commonHelper.assignValues(shippingFound, req?.body);
      if (req?.body?.shippingRange) {
        const timing = (ESTIMATED_TIME as any)[req?.body?.shippingRange] || DEFAULT_SHIPPING_TIMES;

        shippingFound.minShippingTime = timing?.minShippingTime;
        shippingFound.maxShippingTime = timing?.maxShippingTime;
      }
      await shippingFound?.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Updated  Shippings'));
    } catch (err) {
      logger.error(`ShopShippingsController :: updateShopShippings :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getShippingConstants: RequestHandler = async (req, res, next) => {
    try {
      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Shipping Constants Found', {
          regions: GERMANY_REGIONS,
          shippingTimes: Object.keys(ESTIMATED_TIME),
        }),
      );
    } catch (err) {
      logger.error(`ShopShippingsController :: getShippingConstants :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const shopShippingController = new ShopShippingsController();
