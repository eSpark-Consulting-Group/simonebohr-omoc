import { Schema, model } from 'mongoose';
import { IProductVariants } from '../interfaces';
import { MODEL_NAMES, WEIGHT_UNITS } from '../constants';

const schema = new Schema<IProductVariants>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.PRODUCTS,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    dimensions: {
      type: String,
      required: false,
    },
    dimensionsUnit: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    weightUnit: {
      type: String,
      required: false,
      default: WEIGHT_UNITS.LBS,
    },
    barCode: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const ProductVariants = model(MODEL_NAMES.PRODUCT_VARIANTS, schema);
