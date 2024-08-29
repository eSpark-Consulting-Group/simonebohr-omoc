import Joi from 'joi';
import { FAQ_TYPES, OPERATION } from '../constants';

class FaqValidation {
  createFaq = Joi.object({
    type: Joi.string()
      .required()
      .valid(...Object.values(FAQ_TYPES)),
    productId: Joi.string().hex().length(24).when('type', {
      is: FAQ_TYPES.PRODUCT,
      then: Joi.required(),
    }),
    variantId: Joi.string().hex().length(24).optional(),
    question: Joi.string().required(),
    answer: Joi.string().required(),
  });
}

export const faqValidation = new FaqValidation();
