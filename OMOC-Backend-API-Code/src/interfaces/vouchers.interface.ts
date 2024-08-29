import { Types } from 'mongoose';

export interface IVouchers {
  type: string;
  email: string;
  name: string;
  code: string;
  startDate: Date;
  endDate: Date;
  shippingAmount: number;
  minimumOrder: number;
  quota: number;
  forAllBuyers: boolean;
  forFollowers: boolean;
  applicableOn: string;
  shopId: Types.ObjectId;
  isDeleted: boolean;
  quantity: number;
  eventName: string;
  eventDate: Date;
}
