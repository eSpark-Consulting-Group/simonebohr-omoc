import Joi from 'joi';

export class BusinessValidations {
  static businessInfos = Joi.object({
    isAlreadySelling: Joi.boolean().required(),
    businessName: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().required(),
    category: Joi.string().required(),
  });

  static verifyBusiness = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(4).required(),
  });

  static editBusinessBasicInfo = Joi.object({
    name: Joi.string(),
    companyName: Joi.string(),
    ownerName: Joi.string(),
    taxId: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email(),
  });
}
