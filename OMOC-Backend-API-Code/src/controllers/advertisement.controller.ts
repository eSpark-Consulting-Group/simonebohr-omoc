import { RequestHandler } from 'express';
import { ICustomRequest } from '../interfaces';
import { handleResponse, logger } from '../utils';
import { CURRENCY_TYPES, HTTP_STATUS, PAYMENT_INTENT_STATUS } from '../constants';
import { Advertisements } from '../models';
import { stripeHelper } from '../helpers';
import { PaymentError, UnprocessableEntityError } from '../errors';

export class AdvertisementController {
  createAdvertisement: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { paymentId } = req?.body;
      if (!paymentId) {
        throw new UnprocessableEntityError('paymentId nopt found');
      }
      const { userAccount } = await stripeHelper.getUserStripeAccount(userDetails?.id as string, userDetails?.role as any);
      const payment = await stripeHelper.makePayment({
        customerId: userAccount?.stripeCustomerId,
        amount: req?.body?.totalAmountPaid ?? 100,
        currency: CURRENCY_TYPES.USD,
        paymentId,
      });
      if (payment?.status !== PAYMENT_INTENT_STATUS.SUCCEEDED) {
        throw new PaymentError(`Payment Failed With status ${payment?.status}`);
      }
      await Advertisements.create({
        ...req.body,
        createdBy: userDetails?.id,
        shopId: userDetails?.shopId,
      });

      return res.status(HTTP_STATUS.OK).json(handleResponse('Advertisement Has been created successfully'));
    } catch (err) {
      logger.error(`AdvertisementController :: createAdvertisement :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllSellerAdvertisement: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
    } catch (err) {
      logger.error(`AdvertisementController :: getAllAdvertisement :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const advertisementController = new AdvertisementController();
