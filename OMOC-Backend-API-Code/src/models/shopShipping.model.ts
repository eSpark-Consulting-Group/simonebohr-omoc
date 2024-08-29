import { Schema, model } from 'mongoose';
import { IShopShippings, IUserVerification } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IShopShippings>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.BUSINESS_INFO,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    tax: {
      type: Number,
    },
    minShippingTime: {
      type: Number,
    },
    maxShippingTime: {
      type: Number,
    },
    minPrince: {
      type: Number,
    },
    wareHouseId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.WARE_HOUSES,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const ShopShippings = model(MODEL_NAMES.SHOP_SHIPPINGS, schema);
