import { Schema, model } from 'mongoose';
import { IStripeSellerAccounts } from '../interfaces';
import { MODEL_NAMES } from '../constants';


const schema = new Schema<IStripeSellerAccounts>(
    {
        shopIds: [{
            type: String,
            required: true,
        }],
        
        userId: {
            type: String,
            required: true,
        },
        accountId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const StripeSellerAccounts = model(MODEL_NAMES.STRIPE_SELLER_ACCOUNTS, schema);
