import { Schema, model } from 'mongoose';
import { IBanners } from '../interfaces';
import { MODEL_NAMES } from '../constants';
import { commonHelper } from '../helpers';

const schema = new Schema<IBanners>(
  {
    shopId: {
      type: String,
      ref: MODEL_NAMES.BUSINESS_INFO,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },

    endDate: {
      type: Date,
      default: commonHelper.getDateAfterDays(30),
    },

    startDate: {
      type: Date,
      default: new Date(),
    },

    imageUrl: {
      type: String,
    },

    maxRedemptions: {
      type: Number,
      default: 5,
    },

    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAMES.PRODUCTS,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Banners = model(MODEL_NAMES.BANNER, schema);
