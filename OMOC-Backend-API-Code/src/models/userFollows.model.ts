import { Schema, Types, model } from 'mongoose';
import { IUserFollows, IUserInfos } from '../interfaces';
import { FOLLOW_STATUS, MODEL_NAMES } from '../constants';

const schema = new Schema<IUserFollows>(
  {
    // The ID of the user who is following another user.
    followerId: {
      type: Types.ObjectId,
      required: true,
      ref: MODEL_NAMES.USERS,
    },

    // The ID of the user being followed.
    followingId: {
      type: Types.ObjectId,
      required: true,
      ref: MODEL_NAMES.USERS,
    },

    followDateTime: {
      type: Date,
      required: true,
      default: new Date(),
    },

    unFollowDateTime: {
      type: Date,
      required: false,
    },

    status: {
      type: String,
      enum: FOLLOW_STATUS,
      default: FOLLOW_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

// Model used to keep track of follow of users only
export const UserFollows = model(MODEL_NAMES.USER_FOLLOWS, schema);
