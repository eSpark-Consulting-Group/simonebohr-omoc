export {};
import { Schema, model } from 'mongoose';
import { IProductCertificates } from '../interfaces';
import { MODEL_NAMES, PRODUCT_CERTIFICATES_STATUS } from '../constants';

const schema = new Schema<IProductCertificates>(
  {
    productId: {
      type: String,
      required: true,
    },
    variantId: {
      type: String,
      required: false,
    },
    shopId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    submittedBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: PRODUCT_CERTIFICATES_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductCertificates = model(MODEL_NAMES.PRODUCT_CERTIFICATES, schema);
