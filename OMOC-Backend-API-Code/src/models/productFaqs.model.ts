import { Schema, model } from 'mongoose';
import { IProductFaqs } from '../interfaces';
import { FAQ_TYPES, MODEL_NAMES } from '../constants';

const schema = new Schema<IProductFaqs>(
  {
    productId: {
      type: String,
      required: false,
    },
    variantId: {
      type: String,
      required: false,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
      required: true,
    },
    type: { type: String, default: FAQ_TYPES.PRODUCT },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductFaqs = model(MODEL_NAMES.PRODUCT_FAQS, schema);
