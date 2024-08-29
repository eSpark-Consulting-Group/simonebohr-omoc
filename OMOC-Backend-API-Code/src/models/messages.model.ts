import { Schema, model } from 'mongoose';
import { IMessages } from '../interfaces';
import { MODEL_NAMES, ROLES } from '../constants';
import { chatUserSchema, filesSchema } from './schemas';

const schema = new Schema<IMessages>(
  {
    sender: chatUserSchema,

    isEdited: {
      type: Boolean,
      default: false,
      allowNull: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      allowNull: false,
    },

    chatId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.CHATS,
    },

    message: {
      type: String,
    },

    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAMES.PRODUCTS,
      },
    ],

    files: [filesSchema],

    readBy: [chatUserSchema],
  },
  {
    timestamps: true,
  },
);

export const Messages = model(MODEL_NAMES.MESSAGES, schema);
