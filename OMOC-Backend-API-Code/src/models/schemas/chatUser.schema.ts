import { Schema, SchemaTypes } from 'mongoose';
import { CHAT_STATUS, MODEL_NAMES, ROLES } from '../../constants';

export const chatUserSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: function () {
      return (this as any).role === ROLES.SELLER ? MODEL_NAMES.SELLERS : MODEL_NAMES.USERS;
    },
  },

  role: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: CHAT_STATUS.PENDING,
    required: true,
  },
});
