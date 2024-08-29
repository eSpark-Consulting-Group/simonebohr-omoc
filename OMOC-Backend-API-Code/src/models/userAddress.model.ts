import { Schema, model } from 'mongoose';
import { IUserAddress } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IUserAddress>(
  {
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    isPrimary: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: false,
    },
    lat: {
      type: String,
      required: false,
    },
    long: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const UserAddress = model(MODEL_NAMES.USER_ADDRESS, schema);
