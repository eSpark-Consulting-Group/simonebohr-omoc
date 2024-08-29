import { Schema, Types, model } from 'mongoose';
import { MODEL_NAMES, ROLES } from '../constants';
import { IReports } from '../interfaces';
import { filesSchema } from './schemas';

const schema = new Schema<IReports>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: function () {
        return (this as any).role === ROLES.SELLER ? MODEL_NAMES.SELLERS : MODEL_NAMES.USERS;
      },
    },
    role: {
      type: String,
      required: true,
    },
    entityId: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isResolved: {
      type: Boolean,
      required: true,
      default: false,
    },
    resolvedAt: {
      type: Date,
      required: false,
    },
    resolvedBy: {
      type: Types.ObjectId,
      required: false,
      function() {
        return (this as any).resolvedByRole === ROLES.SELLER ? MODEL_NAMES.SELLERS : MODEL_NAMES.USERS;
      },
    },
    resolvedByRole: {
      type: String,
      required: false,
    },
    files: [filesSchema],
  },
  {
    timestamps: true,
  },
);

export const Reports = model(MODEL_NAMES.REPORTS, schema);
