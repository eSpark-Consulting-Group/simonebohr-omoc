import Joi from 'joi';
import { OPERATION } from '../constants';

export class CartValidation {
  static createCart = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().optional(),
    variantId: Joi.string().hex().length(24).optional(),
    note: Joi.string().optional(),
  });

  static operationValidation = Joi.object({
    value: Joi.string().valid(OPERATION.INCREMENT, OPERATION.DECREMENT).required(),
  });

  static deleteCart = Joi.object({
    productIds: Joi.array().items(Joi.string().hex().length(24)).required(),
  });

  static editCart = Joi.object({
    productIds: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().hex().length(24).required(),
          quantity: Joi.number().required(),
          note: Joi.string().optional(),
        }).required(),
      )
      .required(),
  });
}
