import { Schema, model } from 'mongoose';
import { IBusinessInfo } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IBusinessInfo>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
    },
    logo: {
      type: String,
    },
    country: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },

    isAlreadySelling: {
      type: Boolean,
      required: false,
      default: false,
    },

    taxId: {
      type: String,
      required: false,
    },

    companyName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const BusinessInfos = model(MODEL_NAMES.BUSINESS_INFO, schema);
