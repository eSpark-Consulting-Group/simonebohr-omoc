import Joi from 'joi';

export class UserValidations {
  static updateProfile = Joi.object({
    name: Joi.string().optional(),
    phone: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
    email: Joi.string().optional(),
    bio: Joi.string().optional(),
    language: Joi.string().optional(),
    userName: Joi.string().optional(),
    password: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
    interests: Joi.array().items(Joi.string()),
  });
}
