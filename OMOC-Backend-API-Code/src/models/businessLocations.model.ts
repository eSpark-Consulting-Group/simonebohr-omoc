import { Schema, model } from 'mongoose';
import { IBusinessLocations } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IBusinessLocations>(
  {
    businessId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    region: {
      type: String,
    },
    lat: {
      type: String,
      required: false,
    },
    long: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    zipCode: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const BusinessLocations = model(MODEL_NAMES.BUSINESS_LOCATIONS, schema);
