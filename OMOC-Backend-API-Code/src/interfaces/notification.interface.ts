import { ObjectId } from 'mongoose';

export interface IUserNotificationSettings {
  userId: ObjectId;
  omocNotification: boolean;
  messageNotification: boolean;
  newPostNotification: boolean;
  shopsNotification: boolean;
  selectedShops: ObjectId[];
  favProductsAvailable: boolean;
  productUpdates: boolean;
  productInStock: boolean;
}

export interface INewsLetterSettings {
  userId: ObjectId;
  omocNewsLetterByEmail: boolean;
  newProductNotification: boolean;
  eventsNotification: boolean;
  saleNotification: boolean;
}
