import { Schema, model } from 'mongoose';
import { IUserInfos, IUserVerification } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IUserInfos>(
  {
    userId: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      required: false,
    },
    isPrivateAccount: {
      type: Boolean,
      default: false,
      required: true,
    },
    isTourCompleted: {
      type: Boolean,
      default: false,
    },
    isChatTourCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const UserInfos = model(MODEL_NAMES.USER_INFOS, schema);
