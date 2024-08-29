import { Schema, model } from 'mongoose';
import { ICategories } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<ICategories>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.BUSINESS_INFO,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      allowNull: false,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAMES.PRODUCTS,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Categories = model(MODEL_NAMES.CATEGORIES, schema);
