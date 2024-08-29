import { ObjectId } from 'mongoose';

export interface IShopShippings {
  shopId: ObjectId;
  region: string;
  tax: number;
  minShippingTime: number;
  maxShippingTime: number;
  minPrince: number;
  wareHouseId: ObjectId;
  isDeleted: Boolean;
}

export interface IShippingRequest {
  shopId: ObjectId;
  regionId: ObjectId;
  userId: ObjectId;
  status: string;
}
