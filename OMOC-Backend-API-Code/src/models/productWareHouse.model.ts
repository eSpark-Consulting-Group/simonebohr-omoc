import { Schema, model } from 'mongoose';
import { IProductWareHouses, IUserInfos, IUserVerification } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IProductWareHouses>(
  {
    wareHouseId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: false,
    },
    barCode: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductWareHouses = model(MODEL_NAMES.PRODUCT_WAREHOUSES, schema);
