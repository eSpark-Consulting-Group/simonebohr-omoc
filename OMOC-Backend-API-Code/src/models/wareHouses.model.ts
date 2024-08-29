import { Schema, model } from 'mongoose';
import { IWareHouses } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IWareHouses>(
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

export const WareHouses = model(MODEL_NAMES.WARE_HOUSES, schema);
