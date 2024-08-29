import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.PRODUCTS,
      required: true,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.BUSINESS_INFO,
      required: true,
    },
    variantId: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Carts = model(MODEL_NAMES.CART, schema);
