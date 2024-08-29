import { Schema, model } from 'mongoose';
import { IOrderSummary, IOrders } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IOrderSummary>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
      required: true,
    },
    totalItems: {
      type: Number,
      required: false,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryType: {
      type: String,
      required: false,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USER_ADDRESS,
      required: false,
    },
    orderedOn: {
      type: Date,
      required: true,
      default: new Date(),
    },
    paymentType: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: false,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const OrderSummary = model(MODEL_NAMES.ORDER_SUMMARY, schema);
