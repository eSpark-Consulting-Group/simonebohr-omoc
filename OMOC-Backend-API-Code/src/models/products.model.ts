import { Schema, model } from 'mongoose';
import { IProducts } from '../interfaces';
import { CURRENCY_TYPES, MODEL_NAMES, PRODUCT_TYPES, WEIGHT_UNITS } from '../constants';

const schema = new Schema<IProducts>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    images: [
      {
        url: { type: String, required: false },
        publicId: { type: String, required: false, select: false },
      },
    ],
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.BUSINESS_INFO,
      required: true,
      index: true,
    },
    discountId: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
      required: false,
    },
    currencyType: {
      type: String,
      default: CURRENCY_TYPES.USD,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    recommendedCategories: {
      type: String,
    },
    availablePaymentMode: [
      {
        type: String,
        required: false,
      },
    ],
    genders: [
      {
        type: String,
        required: false,
      },
    ],
    expectedShippingTime: {
      type: String,
      required: false,
    },
    toolTip: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    barCode: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
    },
    weightUnit: {
      type: String,
      default: WEIGHT_UNITS.LBS,
      required: false,
    },
    maxOrderUnit: {
      type: Number,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    productType: {
      type: String,
      required: false,
      default: PRODUCT_TYPES.PHYSICAL,
    },
  },
  {
    timestamps: true,
  },
);

export const Products = model(MODEL_NAMES.PRODUCTS, schema);
