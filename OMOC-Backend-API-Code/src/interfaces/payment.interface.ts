import { CARD_STATUS, CARD_TYPES } from '../constants';

export interface IStripeSellerAccounts {
  accountId: string;
  shopIds: string[];
  userId: string;
}

export interface ICard {
  paymentId: string;
  cardId: string;
  cardNumber: string;
  last4Digit: number;
  cardType: CARD_TYPES;
  expireMonth: number;
  expireYear: number;
  brand: string;
  isDefault: boolean;
  issuer: string; // The bank or institution issuing the card         |
  holderName: string;
  cvv: string;
  billingAddress: string; // Address associated with the card for billing     |
  balance: number;
  creditLimit: number;
  status: CARD_STATUS;
  country: string;
}

export interface IUserPayments {
  userId: string;
  stripeCustomerId: string;
  cards: ICard[];
}

export interface ITransactions {
  userId: string;
  shopId: string;
  amount: number;
  transactionId: string;
  productId: string;
  status: string;
}
