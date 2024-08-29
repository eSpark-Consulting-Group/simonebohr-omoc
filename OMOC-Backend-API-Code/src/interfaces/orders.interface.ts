import { Schema } from 'mongoose';
import { ORDER_STATUS } from '../constants';

export interface IOrderSummary {
  userId: string | Schema.Types.ObjectId;
  totalItems?: number;
  totalAmount: number;
  deliveryType: string;
  addressId: string | Schema.Types.ObjectId;
  orderedOn?: Date;
  paymentType: string;
  transactionId?: string;
  isPaid?: boolean;
}

export interface IOrders {
  productId: string | Schema.Types.ObjectId;
  variantId?: string;
  amount: number;
  orderId: string | Schema.Types.ObjectId;
  quantity: number;
  status: ORDER_STATUS;
  expectedDeliveryDate?: Date;
}

export interface IOrderTracking {
  orderId: string;
  status: string;
  updatedBy: string;
  text: string;
}
