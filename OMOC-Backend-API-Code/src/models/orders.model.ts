import { Schema, model } from 'mongoose';
import { IOrders } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IOrders>(
  {
    amount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.ORDER_SUMMARY,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.PRODUCTS,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    variantId: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    expectedDeliveryDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Orders = model(MODEL_NAMES.ORDERS, schema);
