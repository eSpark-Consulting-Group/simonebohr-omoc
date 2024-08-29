import { Schema, model } from 'mongoose';
import { ITestimonialResponse } from '../interfaces';
import { MODEL_NAMES } from '../constants';

const schema = new Schema<ITestimonialResponse>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: MODEL_NAMES.USERS,
            required: true,
        },
        shopId: {
            type: Schema.Types.ObjectId,
            ref: MODEL_NAMES.BUSINESS_INFO,
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: MODEL_NAMES.PRODUCTS,
            required: true, 
        },
        reviewId: {
            type: Schema.Types.ObjectId,
            ref: MODEL_NAMES.PRODUCT_REVIEWS,
            required: true, 
        },
        response: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export const TestimonialResponse = model(MODEL_NAMES.TESTIMONIAL_RESPONSE, schema);
