import { Schema, model } from 'mongoose';
import { IUserNotificationSettings } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IUserNotificationSettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
      required: true,
    },

    favProductsAvailable: {
      type: Boolean,
      allowNull: true,
    },

    omocNotification: {
      type: Boolean,
      allowNull: true,
    },

    messageNotification: {
      type: Boolean,
      allowNull: true,
    },

    newPostNotification: {
      type: Boolean,
      allowNull: true,
    },

    productInStock: {
      type: Boolean,
      allowNull: true,
    },

    productUpdates: {
      type: Boolean,
      allowNull: true,
    },

    shopsNotification: {
      type: Boolean,
      allowNull: true,
    },

    selectedShops: [
      {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAMES.BUSINESS_INFO,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const UserNotificationSettings = model(MODEL_NAMES.USER_NOTIFICATION_SETTINGS, schema);
