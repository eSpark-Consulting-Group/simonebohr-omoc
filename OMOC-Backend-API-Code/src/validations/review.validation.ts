import Joi from 'joi';
import { objectIdValidation } from './base.validation';

export class ReviewValidations {
  static reviewProduct = Joi.object({
    orderId: objectIdValidation.required(),
    rating: Joi.number().required(),
    comment: Joi.string().optional(),
    files: Joi.array().items(Joi.string()).optional(),
    variantId: objectIdValidation.optional(),
  });
}
