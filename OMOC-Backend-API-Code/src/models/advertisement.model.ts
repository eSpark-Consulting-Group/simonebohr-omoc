import { Schema, model } from 'mongoose';
import { IAdvertisement } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IAdvertisement>(
  {
    shopId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: { type: String, required: true },

    postType: { type: String, required: true },

    files: [
      {
        type: String,
      },
    ],

    goalType: { type: String, required: true },

    destinationType: { type: String, required: true },

    actionType: { type: String, required: true },

    entityIds: [{ type: String }],

    maxTargetAudience: { type: Number, required: true },

    minTargetAudience: { type: Number, default: 0 },

    budgetType: { type: String, required: true },

    amount: { type: Number, required: true },

    startTime: { type: Date, required: true },

    endTime: { type: Date, required: true },

    industryType: { type: String, required: true },

    minAge: { type: Number },

    maxAge: { type: Number },

    gender: { type: String },

    isPaymentDone: { type: Boolean },

    paymentMethod: { type: String },

    tax: { type: Number },

    totalAmountPaid: { type: Number },

    isEndDate: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

export const Advertisements = model(MODEL_NAMES.ADVERTISEMENTS, schema);
