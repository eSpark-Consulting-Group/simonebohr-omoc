import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';
import { ApiError, NotFoundError, UnprocessableEntityError } from '../errors';
import { logger } from '../utils';
import { BusinessInfos } from '../models';
import { ICustomRequest } from '../interfaces';
import { ROLES } from '../constants';

export const validateShop: RequestHandler = async (req, res, next) => {
  try {
    const userDetails = (req as ICustomRequest)?.user;
    const shopId = ((req?.query?.shopId as string) || '').trim();

    if (!shopId) {
      throw new UnprocessableEntityError('ShopId is required');
    }
    if (!isValidObjectId(shopId)) {
      throw new ApiError('Enter Valid shopId', 422);
    }
    const business = await BusinessInfos.findOne({
      userId: userDetails?.id,
      _id: shopId,
    });
    if (!business) {
      throw new NotFoundError('Shop not found');
    }
    if (!business?.isVerified) {
      throw new UnprocessableEntityError('Shop not verified');
    }
    (req as any).user.shopId = shopId;
    return next();
  } catch (err) {
    logger.error(`Error in validateShop :: ${(err as Error)?.message}`);
    return next(err);
  }
};

export const optionalValidateShop: RequestHandler = async (req, res, next) => {
  try {
    const userDetails = (req as ICustomRequest)?.user;
    const shopId = ((req?.query?.shopId as string) || '').trim();
    if (userDetails?.role === ROLES.SELLER) {
      if (!shopId) {
        throw new UnprocessableEntityError('ShopId is required');
      }
      if (!isValidObjectId(shopId)) {
        throw new ApiError('Enter Valid shopId', 422);
      }
      const business = await BusinessInfos.findOne({
        userId: userDetails?.id,
        _id: shopId,
      });
      if (!business) {
        throw new NotFoundError('Shop not found');
      }
      if (!business?.isVerified) {
        throw new UnprocessableEntityError('Shop not verified');
      }
      (req as any).user.shopId = shopId;
    }
    return next();
  } catch (err) {
    logger.error(`Error in optionalValidateShop :: ${(err as Error)?.message}`);
    return next(err);
  }
};
