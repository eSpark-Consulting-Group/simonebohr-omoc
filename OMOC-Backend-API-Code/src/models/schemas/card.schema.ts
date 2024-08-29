import { Schema } from 'mongoose';
import { ICard } from '../../interfaces';

export const cardSchema = new Schema<ICard>({
  cardNumber: {
    type: String,
    required: false,
  },
  cardId: {
    type: String,
    required: false,
  },
  paymentId: {
    type: String,
    required: false,
  },
  last4Digit: {
    type: Number,
    required: false,
  },
  cardType: {
    type: String,
    required: false,
  },
  expireMonth: {
    type: Number,
    required: false,
  },
  expireYear: {
    type: Number,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  isDefault: {
    type: Boolean,
    required: false,
  },
  issuer: {
    type: String,
    required: false,
  },
  holderName: {
    type: String,
    required: false,
  },
  cvv: {
    type: String,
    required: false,
  },
  billingAddress: {
    type: String,
    required: false,
  },
  balance: {
    type: Number,
    required: false,
  },
  creditLimit: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});
