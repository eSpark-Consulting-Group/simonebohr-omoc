import { Schema, model } from 'mongoose';
import { ISellerInfos } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<ISellerInfos>(
  {
    userId: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      required: false,
    },
    isAlreadySelling: {
      type: Boolean,
      allowNull: true,
    },
    isPrivateAccount: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const SellerInfos = model(MODEL_NAMES.SELLER_INFOS, schema);
