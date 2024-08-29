import Joi from 'joi';
import { LOGIN_TYPE, RESOURCE_TYPE, ROLES } from '../constants';

class BannerValidation {
  createBanner = Joi.object({
    description: Joi.string(),
    title: Joi.string(),
    endDate: Joi.date(),
    startDate: Joi.date(),
    imageUrl: Joi.string().required(),
    productIds: Joi.array().items(Joi.string().hex().length(24).required()).required(),
    maxRedemptions: Joi.number(),
  });
}

export const bannerValidations = new BannerValidation();
