import { ObjectId } from 'mongoose';

export interface IBanners {
  shopId: ObjectId;
  imageUrl: string;
  title: String;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: Boolean;
  maxRedemptions: number;
  productIds: ObjectId[];
}
