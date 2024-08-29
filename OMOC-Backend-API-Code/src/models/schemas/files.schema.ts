import { Schema } from 'mongoose';
import { IFilesSchema, IStoryFilesSchema } from '../../interfaces';

export const filesSchema = new Schema<IFilesSchema>(
  {
    url: {
      type: String,
      required: false,
    },

    thumbnail: {
      type: String,
      required: false,
    },

    type: {
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
  },
  {},
);

export const StoryFilesSchema = new Schema<IStoryFilesSchema>(
  {
    url: {
      type: String,
      required: false,
    },

    thumbnail: {
      type: String,
      required: false,
    },

    type: {
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
  },
  {
    _id: false,
  },
);
