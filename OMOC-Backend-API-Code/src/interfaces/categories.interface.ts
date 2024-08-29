import { ObjectId } from 'mongoose';

export interface ICategories {
  shopId: string | ObjectId;
  isActive: boolean;
  title: string;
  image: string;
  thumbnail: string;
  isDeleted: boolean;
  productIds: ObjectId[];
}
