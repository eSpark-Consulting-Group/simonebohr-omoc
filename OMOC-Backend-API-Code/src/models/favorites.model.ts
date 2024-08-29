import { Schema, model } from 'mongoose';
import { IComments, IFavorites } from '../interfaces';
import { MODEL_NAMES, ROLES } from '../constants';

const schema = new Schema<IFavorites>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: function () {
        return (this as any).role === ROLES.SELLER ? MODEL_NAMES.SELLERS : MODEL_NAMES.USERS;
      },
    },
    role: {
      type: String,
      required: true,
    },
    entityId: { type: String, required: true },

    entityType: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Favorites = model(MODEL_NAMES.FAVORITES, schema);
