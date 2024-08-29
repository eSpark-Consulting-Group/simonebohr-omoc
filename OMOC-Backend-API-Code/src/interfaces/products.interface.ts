import { ObjectId, Schema } from 'mongoose';
import { IImagesObj } from './common.interface';
import { PRODUCT_TYPES } from '../constants';

export interface IProducts {
  name: string;
  category?: string;
  description?: string;
  originalPrice?: number;
  quantity?: number;
  images?: IImagesObj[];
  thumbnail: string;
  addedBy?: string;
  discountId?: string;
  brand?: string;
  price: number;
  currencyType?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  recommendedCategories?: string;
  availablePaymentMode?: string[];
  genders: string[];
  expectedShippingTime?: string;
  toolTip?: string;
  type?: string;
  barCode?: string;
  color?: string;
  size?: string;
  weight?: string;
  weightUnit?: string;
  maxOrderUnit?: number;
  productType?: PRODUCT_TYPES;
}

export interface IProductVariants {
  productId: string | Schema.Types.ObjectId;
  images?: IImagesObj[];
  color?: string;
  size?: string;
  dimensions?: string;
  dimensionsUnit?: string;
  weight?: number;
  weightUnit?: string;
  sku?: string;
  barCode?: string;
  price: number;
}

export interface IProductFaqs {
  productId: string;
  variantId: string;
  question: string;
  answer: string;
  shopId: string;
  type: string;
  isActive: boolean;
}

export interface IProductWareHouses {
  wareHouseId: string;
  productId: string;
  sku: string;
  quantity: number;
  isActive?: boolean;
  barCode?: string;
}

export interface IProductReviews {
  productId: string | ObjectId;
  orderId?: string | ObjectId;
  variantId: string;
  userId: string | ObjectId;
  rating: number;
  comment: string;
  isActive?: boolean;
  status: string;
  files?: string[];
}

export interface IProductCertificates {
  productId: string;
  variantId: string;
  shopId: string;
  isActive: boolean;
  submittedBy: string;
  status: string;
}
