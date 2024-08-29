import Joi from 'joi';

export class AddressValidation {
  static addAddress = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    region: Joi.string(),
    phoneNumber: Joi.string().required(),
    city: Joi.string(),
    zipCode: Joi.string(),
    country: Joi.string(),
    isPrimary: Joi.boolean(),
    icon: Joi.string(),
    lat: Joi.string().optional(),
    long: Joi.string().optional(),
  });

  static updateAddress = Joi.object({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    region: Joi.string().optional(),
    city: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional(),
    lat: Joi.string().optional(),
    long: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    isPrimary: Joi.boolean(),
    icon: Joi.string(),
  });

  static createWarehouse = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    region: Joi.string().optional(),
    city: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional(),
    lat: Joi.string().optional(),
    long: Joi.string().optional(),
  });

  static updateWarehouse = Joi.object({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    region: Joi.string().optional(),
    city: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional(),
    lat: Joi.string().optional(),
    long: Joi.string().optional(),
  });

  static editBusinessLocation = this.updateWarehouse.keys({
    locationId: Joi.string().hex().length(24).required(),
  });
}
