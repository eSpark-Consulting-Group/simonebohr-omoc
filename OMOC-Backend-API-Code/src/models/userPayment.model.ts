import { Schema, model } from 'mongoose';
import { IUserPayments } from '../interfaces';
import { MODEL_NAMES } from '../constants';
import { cardSchema } from './schemas';

const schema = new Schema<IUserPayments>(
  {
    userId: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    cards: [cardSchema],
  },
  {
    timestamps: true,
  },
);

export const UserPayments = model(MODEL_NAMES.USER_PAYMENTS, schema);
