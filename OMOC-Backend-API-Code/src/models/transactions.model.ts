import { Schema, model } from 'mongoose';
import { ITransactions } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<ITransactions>(
  {
    userId: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
    },
    transactionId: {
      type: String,
    },
    productId: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Transactions = model(MODEL_NAMES.TRANSACTIONS, schema);
