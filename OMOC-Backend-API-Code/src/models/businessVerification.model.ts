import { Schema, model } from 'mongoose';
import { IBusinessVerification } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IBusinessVerification>(
  {
    businessId: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: false,
      trim: true,
    },
    otpExpTime: {
      type: Date,
      required: false,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExp: {
      type: Date,
      required: false,
    },
    wrongAttemptCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const BusinessVerifications = model(MODEL_NAMES.BUSINESS_VERIFICATIONS, schema);
