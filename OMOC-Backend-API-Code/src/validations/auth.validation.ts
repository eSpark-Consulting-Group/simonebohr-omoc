import Joi from 'joi';
import { LOGIN_TYPE, RESOURCE_TYPE, ROLES } from '../constants';

export class AuthValidation {
  static countryCodeValidation = Joi.string().when('phone', {
    is: Joi.exist(),
    then: Joi.string().required(),
  });
  static signupUser = Joi.object({
    userName: Joi.string()?.optional(),
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string()?.optional(),
    phone: Joi.string(),
    age: Joi.number(),
    dob: Joi.date(),
    countryCode: this.countryCodeValidation,
    deviceToken: Joi.string(),
  }).xor('email', 'phone');

  static signupSeller = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string()?.optional(),
    phone: Joi.string(),
    deviceToken: Joi.string(),
    dob: Joi.date(),
    resourceType: Joi.string().optional().valid(RESOURCE_TYPE.WEB, RESOURCE_TYPE.APP),
    countryCode: this.countryCodeValidation,
  }).xor('email', 'phone');

  static LoginValidations = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8),
    countryCode: Joi.string().optional(),
    phone: Joi.string(),
  }).xor('email', 'phone');

  static verifyOtp = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string(),
    countryCode: Joi.string(),
    otp: Joi.string().length(4).required(),
  }).xor('email', 'phone');

  static resendOtp = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string(),
    countryCode: Joi.string(),
  }).xor('email', 'phone');

  static passwordReset = Joi.object({
    password: Joi.string().min(8),
    token: Joi.string().required(),
  });
}
