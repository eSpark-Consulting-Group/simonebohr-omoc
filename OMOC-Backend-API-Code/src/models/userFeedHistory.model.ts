import { Schema, Types, model } from 'mongoose';
import { IUserFeedHistory } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<IUserFeedHistory>(
    {
        userId: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: false
        },
        entityId: {
            type: String,
            required: false,
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        },

        searchAt: {
            type: Date,
            required: true,
            default: new Date(),
        },

        type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export const UserFeedHistory = model(MODEL_NAMES.USER_FEED_HISTORY, schema);
