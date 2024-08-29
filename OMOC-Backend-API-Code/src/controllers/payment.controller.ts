import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICard, ICustomRequest } from '../interfaces';
import { HTTP_STATUS } from '../constants';
import { commonHelper, stripeHelper } from '../helpers';
import { BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors';
import { isValidObjectId } from 'mongoose';

class PaymentController {
  addCards: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { token, isDefault } = req?.body;

      if (!token) {
        throw new UnprocessableEntityError('Token is required');
      }
      const { user, userAccount } = await stripeHelper.getUserStripeAccount(userDetails?.id as string, userDetails?.role as any);

      const cardData: Partial<ICard> = {
        cardId: token?.card?.id,
        brand: token?.card?.brand,
        last4Digit: token?.card?.last4,
        cvv: token?.card?.cvc,
        expireMonth: token?.card?.exp_month || token?.card?.expMonth,
        expireYear: token?.card?.exp_year || token?.card?.expYear,
        holderName: token?.name || user?.name || '',
        isDefault,
        country: token?.country ?? '',
        cardType: (token?.card?.funding || '')?.toLowerCase(),
      };

      const findCard = userAccount?.cards?.find(data => cardData?.last4Digit && +cardData?.last4Digit === +data?.last4Digit);

      if (findCard) {
        throw new BadRequestError('Already Exists card');
      }

      const paymentMethod = await stripeHelper.addCardToStripe(token?.id);
      // Attach Payment Method to Customer
      await stripeHelper.attachCardToCustomer(paymentMethod?.id, userAccount?.stripeCustomerId);

      cardData.paymentId = paymentMethod?.id;

      // Setting first card to be default
      if (!userAccount?.cards?.length) {
        cardData.isDefault = true;
      }

      if (cardData?.isDefault) {
        userAccount?.cards?.forEach(data => {
          data.isDefault = false;
        });
      }
      userAccount?.cards?.push(cardData as any);
      await userAccount?.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse(`Success`, { card: cardData }));
    } catch (err) {
      logger.error(`PostsController :: addCards :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllCards: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { userAccount } = await stripeHelper.getUserStripeAccount(userDetails?.id as string, userDetails?.role as any);
      return res.status(HTTP_STATUS.OK).json(handleResponse(`Success`, { cards: userAccount?.cards }));
    } catch (err) {
      logger.error(`PaymentController :: getAllCards :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteCard: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const paymentId = req?.params?.paymentId;

      const { userAccount } = await stripeHelper.getUserStripeAccount(userDetails?.id as string, userDetails?.role as any);

      if (!userAccount) {
        throw new NotFoundError('User Payments not found');
      }

      const { removedCard, otherCards } = (userAccount?.cards || [])?.reduce(
        (acc: any, curr) => {
          if (curr?.paymentId === paymentId) {
            acc.removedCard = curr;
          } else {
            acc.otherCards.push(curr);
          }
          return acc;
        },
        {
          removedCard: <any>null,
          otherCards: [],
        },
      );
      if (!removedCard) {
        throw new NotFoundError('Card with that paymentId not found');
      }
      await stripeHelper.detachPayment(removedCard?.paymentId);
      if (removedCard?.isDefault && otherCards.length) {
        userAccount.cards[userAccount.cards?.length - 1].isDefault = true;
      }
      userAccount.cards = otherCards;
      await userAccount.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse(`Deleted successfully`));
    } catch (err) {
      logger.error(`PaymentController :: deleteCard :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  editCard: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const paymentId = req?.params?.paymentId;
      const { expireYear, expireMonth, isDefault } = req?.body;

      const { userAccount } = await stripeHelper.getUserStripeAccount(userDetails?.id as string, userDetails?.role as any);

      if (!userAccount) {
        throw new NotFoundError('User Payments not found');
      }

      const cardData = commonHelper.assignValues(
        {},
        {
          expireYear,
          expireMonth,
          isDefault,
        },
      );
      const { card }: any = await stripeHelper.editPaymentMethod(paymentId, {
        expireYear,
        expireMonth,
      });
      if (card && Object.keys(cardData)?.length) {
        userAccount?.cards?.forEach((data: any) => {
          if (cardData?.isDefault) {
            data.isDefault = false;
          }
          if (data?.paymentId === paymentId) {
            data.expireMonth = card?.exp_month;
            data.expireYear = card?.exp_year;
          }
        });

        await userAccount.save();
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse(`Updated Card Successfully`));
    } catch (err) {
      logger.error(`PaymentController :: editCard :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const paymentController = new PaymentController();
