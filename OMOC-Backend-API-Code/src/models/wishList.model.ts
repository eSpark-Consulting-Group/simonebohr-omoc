import { Schema, Types, model } from 'mongoose';
import { IWishlist } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IWishlist>(
  {
    userId: {
      type: Types.ObjectId,
      ref: MODEL_NAMES.USERS,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    productIds: [
      {
        type: Types.ObjectId,
        ref: MODEL_NAMES.PRODUCTS,
      },
    ],
    sharedWith: [
      {
        type: Types.ObjectId,
        ref: MODEL_NAMES.USERS,
      },
    ],

    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },

    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const WishLists = model(MODEL_NAMES.WISH_LISTS, schema);
