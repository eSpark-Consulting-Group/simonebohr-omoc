import { RequestHandler } from 'express';
import { HTTP_STATUS } from '../constants';
import { handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { Sellers, StripeSellerAccounts } from '../models';
import { stripeHelper } from '../helpers';
import { Types } from 'mongoose';

export class AccountsController {
  getAccountOnBoardingLink: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;

      const userFound = await Sellers.findOne({
        _id: new Types.ObjectId(userDetails?.id),
      });
      let userAccount = await StripeSellerAccounts.findOne({
        userId: userDetails?.id,
        // shopIds: ,
      });
      if (!userAccount) {
        const accountCreated = await stripeHelper.createStripeAccount({
          country: 'US',
          email: <string>userFound?.email,
        });
        userAccount = await StripeSellerAccounts.create({
          userId: userDetails?.id,
          shopIds: [userDetails?.shopId],
          accountId: accountCreated?.id,
        });
      }
      const links = await stripeHelper.createAccountOnBoardingLink(userAccount.accountId);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Account Created Successfully', userAccount));
    } catch (err) {
      logger.error(`AccountsController :: getAccountOnBoardingLink :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const accountsController = new AccountsController();
