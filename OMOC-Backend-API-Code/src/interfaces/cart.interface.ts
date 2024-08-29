import { Schema } from 'mongoose';

export interface ICart {
  userId: string;
  productId: Schema.Types.ObjectId;
  variantId: string;
  quantity: number;
  note: string;
  shopId: Schema.Types.ObjectId;
}
