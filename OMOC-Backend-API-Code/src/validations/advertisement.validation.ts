import Joi from 'joi';
import { ADD_ACTIONS, ADD_BUDGETS, ADD_DESTINATIONS, ADD_GOAL_TYPES, ADD_POST_TYPES, ADVERTISEMENT_TYPES, GENDERS } from '../constants';

class AdvertisementValidations {
  createAdvertisement = Joi.object({
    name: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(ADVERTISEMENT_TYPES))
      .required(),
    postType: Joi.string()
      .valid(...Object.values(ADD_POST_TYPES))
      .required(),
    files: Joi.array().items(),
    goalType: Joi.string()
      .valid(...Object.values(ADD_GOAL_TYPES))
      .required(),
    destinationType: Joi.string()
      .valid(...Object.values(ADD_DESTINATIONS))
      .required(),
    actionType: Joi.string()
      .valid(...Object.values(ADD_ACTIONS))
      .required(),
    entityIds: Joi.array().items(Joi.string().hex().length(24)),
    maxTargetAudience: Joi.number().required(),
    minTargetAudience: Joi.number(),
    budgetType: Joi.string()
      .valid(...Object.values(ADD_BUDGETS))
      .required(),
    amount: Joi.number(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    industryType: Joi.string(),
    minAge: Joi.number(),
    maxAge: Joi.number(),
    gender: Joi.string()
      .valid(...Object.values(GENDERS))
      .required(),
    isPaymentDone: Joi.boolean(),
    paymentMethod: Joi.string().allow(''),
    tax: Joi.number(),
    totalAmountPaid: Joi.number(),
    isEndDate: Joi.boolean(),
    paymentId: Joi.string(),
  });
}

export const advertisementValidation = new AdvertisementValidations();
