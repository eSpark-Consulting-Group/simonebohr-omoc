import Joi from 'joi';
import { objectIdValidation } from './base.validation';

export class CategoryValidations {
  static addCategory = Joi.object({
    title: Joi.string().required(),
    productIds: Joi.array().items(objectIdValidation.required()).required(),
  });

  static updateCategory = Joi.object({
    title: Joi.string(),
    productIds: Joi.array().items(objectIdValidation),
  });
}
