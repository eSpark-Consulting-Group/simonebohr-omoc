import { Schema, model } from 'mongoose';
import { IFollowMappings } from '../interfaces';
import { FOLLOW_STATUS, MODEL_NAMES } from '../constants';

const schema = new Schema<IFollowMappings>(
  {
    // The ID of the user who is following another user.
    followerId: {
      type: String,
      required: true
    },

    followerType: {
      type: String,
      required: true
    },

    // The ID of the followed.
    entityId: {
      type: String,
      required: true,
    },

    entityType: {
      type: String,
      required: true,
    },

    followDateTime: {
      type: Date,
      required: true,
      default: new Date(),
    },

    unFollowDateTime: {
      type: Date,
      required: false,
    },

    status: {
      type: String,
      enum: FOLLOW_STATUS,
      default: FOLLOW_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

// Model to save all the user following except user
export const FollowMappings = model(MODEL_NAMES.FOLLOW_MAPPINGS, schema);
