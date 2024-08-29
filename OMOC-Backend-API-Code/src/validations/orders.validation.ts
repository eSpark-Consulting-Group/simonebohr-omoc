import Joi from 'joi';
import { PAYMENT_TYPES } from '../constants';

export class OrdersValidation {
  static productsValidation = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    variantId: Joi.string().hex().length(24).optional(),
    quantity: Joi.number().required(),
  });
  static placeOrder = Joi.object({
    products: Joi.array().items(this.productsValidation.required()).required(),
    addressId: Joi.string().hex().length(24).required(),
    paymentType: Joi.string()
      .valid(...Object.values(PAYMENT_TYPES))
      .required(),
    transactionId: Joi.string().optional(),
    deliveryType: Joi.string().optional(),
    isPaid: Joi.boolean().optional(),
    paymentId: Joi.string(),
  });
}
