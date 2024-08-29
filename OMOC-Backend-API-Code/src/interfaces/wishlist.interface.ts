import { ObjectId } from 'mongoose';

export interface IWishlist {
  userId: ObjectId;
  name: string;
  isDeleted: boolean;
  isPrivate: boolean;
  isGroup: boolean;
  productIds: ObjectId[];
  sharedWith: ObjectId[];
}
