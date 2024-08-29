import { Schema, Types, model } from 'mongoose';
import { IStories } from '../interfaces';
import { MODEL_NAMES, POST_SHARED_WITH, ROLES } from '../constants';
import { commonHelper } from '../helpers';
import { labelsSchema, textSchema } from './schemas/labels.schema';

const schema = new Schema<IStories>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: function () {
        return (this as any).role === ROLES.SELLER ? MODEL_NAMES.SELLERS : MODEL_NAMES.USERS;
      },
    },
    role: {
      type: String,
      required: true,
    },

    sharedWith: {
      type: String,
      enum: POST_SHARED_WITH,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    type: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      required: false,
    },

    expiresAt: {
      type: Date,
      required: true,
      default: commonHelper.getDateAfter24Hours(),
    },
    url: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },

    unit: {
      type: String,
      required: false,
    },

    size: {
      type: Number,
      required: false,
    },

    width: {
      type: Number,
      required: false,
    },

    height: {
      type: Number,
      required: false,
    },

    ratio: {
      type: Number,
      required: false,
    },

    translateX: {
      type: Number,
      required: false,
    },

    rotateDeg: {
      type: Number,
      required: false,
    },

    translateY: {
      type: Number,
      required: false,
    },

    labels: [labelsSchema],

    texts: [textSchema],

    extension: String,

    commentsCount: {
      type: Number,
      default: 0,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    scheduledAt: {
      type: Date,
      default: new Date(),
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    viewsCount: {
      type: Number,
      default: 0,
    },

    shopId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Stories = model(MODEL_NAMES.STORIES, schema);
