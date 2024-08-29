import { Schema, model } from 'mongoose';
import { MODEL_NAMES } from '../constants';
import { chatUserSchema } from './schemas';
import { CHAT_STATUS, CHAT_TYPES } from '../constants';
import { IChats } from '../interfaces';

const schema = new Schema<IChats>(
  {
    name: {
      type: String,
      required: false,
    },

    users: [chatUserSchema],

    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },

    groupAdmins: [chatUserSchema],

    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    image: {
      url: String,
      thumbnail: String,
    },

    shopId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.BUSINESS_INFO,
    },

    type: {
      type: String,
      default: CHAT_TYPES.PERSONAL,
      required: true,
    },

    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.MESSAGES,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Chats = model(MODEL_NAMES.CHATS, schema);
