import Joi from 'joi';

class PaymentValidation {
  addCard = Joi.object({
    cardNumber: Joi.string().required(),
    cardType: Joi.string(),
    expireYear: Joi.number().required(),
    expireMonth: Joi.number().required(),
    holderName: Joi.string(),
    cvv: Joi.number().required(),
    brand: Joi.string(),
    issuer: Joi.string(),
  });
}

export const paymentValidation = new PaymentValidation();
