import { Schema, model } from 'mongoose';
import { ILikes } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<ILikes>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
      required: true,
    },

    isLiked: {
      type: Boolean,
      default: false,
      allowNull: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      allowNull: false,
    },

    entityId: {
      type: String,
      required: true,
    },

    entityType: {
      type: String,
      required: true,
    },

    shopId: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Likes = model(MODEL_NAMES.LIKES, schema);
