import Joi from 'joi';

class ShippingValidations {
  createShipping = Joi.object({
    region: Joi.string().required(),
    tax: Joi.number().required(),
    shippingRange: Joi.string().required(),
    minPrince: Joi.number().required(),
    wareHouseId: Joi.string().length(24).hex(),
  });

  updateShipping = Joi.object({
    region: Joi.string(),
    tax: Joi.number(),
    shippingRange: Joi.string(),
    minPrince: Joi.number(),
    wareHouseId: Joi.string().length(24).hex(),
  });
}

export const shippingValidations = new ShippingValidations();
