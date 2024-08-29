import { Schema, model } from 'mongoose';
import { IComments } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IComments>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
      required: true,
    },
    entityId: { type: String, required: true },

    entityType: { type: String, required: true },

    comment: { type: String },

    isDeleted: { type: Boolean, required: true, default: false },

    likesCount: { type: Number, required: true, default: 0 },

    repliesCount: { type: Number, required: true, default: 0 },

    shopId: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Comments = model(MODEL_NAMES.COMMENTS, schema);
