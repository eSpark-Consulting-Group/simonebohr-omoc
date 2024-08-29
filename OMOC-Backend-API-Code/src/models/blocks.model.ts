import { Schema, Types, model } from 'mongoose';
import { IUserBlocks } from '../interfaces';
import { MODEL_NAMES, ROLES } from '../constants';

const schema = new Schema<IUserBlocks>(
  {
    // The ID of the user who is blocking another user.
    blockerId: {
      type: Types.ObjectId,
      required: true,
      ref: function () {
        return (this as any).blockerRole === ROLES.SELLER ? MODEL_NAMES.SELLERS : MODEL_NAMES.USERS;
      },
    },
    blockerRole: {
      type: String,
    },

    // The ID of the user being blocked.
    blockedId: {
      type: Types.ObjectId,
      required: true,
      ref: function () {
        return (this as any).blocked === ROLES.SELLER ? MODEL_NAMES.SELLERS : MODEL_NAMES.USERS;
      },
    },

    blockedRole: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const UserBlocks = model(MODEL_NAMES.USER_BLOCKS, schema);
