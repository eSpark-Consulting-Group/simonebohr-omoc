import { Schema, model } from 'mongoose';
import { IVideos } from '../interfaces';
import { DEFAULT_CART_TEXT, MODEL_NAMES } from '../constants';

const schema = new Schema<IVideos>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    files: [
      {
        url: {
          type: String,
          required: false,
        },
        thumbnailUrl: {
          type: String,
          required: false,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },

    location: {
      type: Object,
      required: false,
    },

    caption: {
      type: String,
      required: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    isPrePurchased: {
      type: Boolean,
    },

    cartText: {
      type: String,
      default: DEFAULT_CART_TEXT,
    },

    availableQuantity: {
      type: Number,
    },
    availableDate: {
      type: Date,
    },
    discountType: {
      type: String,
    },
    discountPercentage: {
      type: Number,
    },
    hideLikeViewCount: {
      type: Boolean,
      default: false,
    },

    isCommentingOff: {
      type: Boolean,
      default: false,
    },

    isSensitiveContent: {
      type: Boolean,
      default: false,
    },

    tags: [
      {
        type: String,
      },
    ],
    productIds: [
      {
        type: String,
      },
    ],
    scheduledAt: {
      type: Date,
      default: new Date(),
    },

    sharedWith: {
      type: String,
    },

    shopId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Videos = model(MODEL_NAMES.VIDEOS, schema);
