import { Schema, model } from 'mongoose';
import { INewsLetterSettings } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<INewsLetterSettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
      required: true,
    },
    eventsNotification: {
      type: Boolean,
      required: false,
    },
    newProductNotification: {
      type: Boolean,
      required: false,
    },
    omocNewsLetterByEmail: {
      type: Boolean,
      required: false,
    },
    saleNotification: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const NewsLetterSettings = model(MODEL_NAMES.NEWS_LETTER_SETTINGS, schema);
