import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, configs } from '../config';
import { ACCOUNT_TYPE, CURRENCY_TYPES, PAYMENT_TYPES, ROLES } from '../constants';
import { UserPayments } from '../models';
import { logger } from '../utils';
import { userRepo } from '../repository';

export const stripe = new Stripe(STRIPE_SECRET_KEY);

class StripeHelper {
  createStripeAccount(data: { country: string; email: string }) {
    return stripe.accounts.create({
      country: data?.country,
      type: ACCOUNT_TYPE.CUSTOM,
      // business_type: BUSINESS_TYPES.BUSINESS,
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });
  }

  createAccountOnBoardingLink(accountId: string) {
    return stripe.accountLinks.create({
      account: accountId,
      return_url: `http://localhost:${configs.PORT}`,
      refresh_url: `http://localhost:${configs.PORT}`,
      collect: 'eventually_due',
      type: 'account_onboarding',
    });
  }

  async getUserStripeAccount(userId: string, role: ROLES) {
    try {
      let userAccount = await UserPayments.findOne({
        userId,
      });
      const user = await userRepo.getUserDetailsById(userId, role);
      if (!userAccount) {
        const createdStripeCustomer = await stripe.customers.create({
          email: user?.email,
          name: user?.name,
          phone: user?.phone,
          //   c: CURRENCY_TYPES.USD,
        } as any);
        userAccount = await UserPayments.create({
          userId,
          stripeCustomerId: createdStripeCustomer?.id,
        });
      }
      return { user, userAccount };
    } catch (err) {
      logger.error(`StripeHelper :: getUserStripeAccount :: ${(err as Error)?.message}`);
      throw err;
    }
  }

  createStripeCharge = (userAccount?: any, idempotencyKey?: any, user?: any) => {
    return stripe.charges.create(
      {
        amount: 5000 * 100,
        customer: 'cus_Q4s6fRsbLt8h2Y',
        currency: CURRENCY_TYPES.USD,
        receipt_email: 'user@gmail.com',
        description: 'charge for products',
        source: 'card_1PEiMeRtfFKiaX9VEB1Iutbt',
      },
      { ...(idempotencyKey && { idempotencyKey }) },
    );
  };

  addCardToStripe = (tokenId: string) => {
    return stripe.paymentMethods.create({
      type: PAYMENT_TYPES.CARD,
      card: {
        token: tokenId,
      },
    });
  };

  attachCardToCustomer = (paymentId: string, customer: string) => {
    return stripe.paymentMethods.attach(paymentId, {
      customer,
    });
  };

  makePayment = (transactionData: { amount: number; customerId: string; paymentId: string; destination?: string; currency?: CURRENCY_TYPES }) => {
    return stripe.paymentIntents.create({
      amount: transactionData?.amount * 100,
      currency: transactionData?.currency ?? CURRENCY_TYPES.USD,
      customer: transactionData?.customerId, // Customer ID associated with the saved card
      payment_method: transactionData?.paymentId, // Payment Method ID associated with the saved card
      confirm: true, // Confirm the payment intent immediately,
      // return_url: 'http://localhost:3000/success',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      ...(transactionData?.destination && {
        transfer_data: {
          destination: transactionData?.destination,
        },
      }),
    });
  };

  detachPayment = (paymentId: string) => {
    return stripe.paymentMethods.detach(paymentId);
  };

  async editPaymentMethod(paymentMethodId: string, cardData: { expireMonth?: number; expireYear?: number }) {
    if (!cardData?.expireMonth || !cardData?.expireYear) {
      return;
    }
    return stripe.paymentMethods.update(paymentMethodId, {
      card: {
        ...(cardData.expireMonth && { exp_month: cardData.expireMonth }),
        ...(cardData?.expireYear && { exp_year: cardData?.expireYear }),
      },
    });
  }
}

export const stripeHelper = new StripeHelper();
