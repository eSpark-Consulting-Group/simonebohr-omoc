import { Schema, model } from 'mongoose';
import { IVouchers, IWareHouses } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IVouchers>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.BUSINESS_INFO,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    // Type - Free Shipping,
    applicableOn: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    // Voucher Type:- Newsletter Voucher, Product Voucher, Livestream Voucher
    type: {
      type: String,
      required: false,
    },
    forAllBuyers: {
      type: Boolean,
      default: false,
    },
    forFollowers: {
      type: Boolean,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    minimumOrder: {
      type: Number,
      required: false,
    },
    shippingAmount: {
      type: Number,
      required: false,
    },
    quota: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
    },
    eventDate: {
      type: Date,
    },
    eventName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Vouchers = model(MODEL_NAMES.VOUCHERS, schema);
