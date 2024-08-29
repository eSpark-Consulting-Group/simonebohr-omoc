import { Schema, model } from 'mongoose';
import { IProductReviews } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IProductReviews>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.PRODUCTS,
      required: true,
    },
    variantId: {
      type: String,
      required: false,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.ORDERS,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    comment: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    files: [{ type: String, required: false }],
  },
  {
    timestamps: true,
  },
);

export const ProductReviews = model(MODEL_NAMES.PRODUCT_REVIEWS, schema);
