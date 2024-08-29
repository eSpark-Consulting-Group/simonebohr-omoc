import Joi from 'joi';
import { VOUCHER_TYPES } from '../constants';

export class VoucherValidations {
  static allowNull = Joi.allow('', null);

  static createVoucher = Joi.object({
    type: Joi.string()
      .valid(...Object.values(VOUCHER_TYPES))
      .required(),
    name: Joi.string().required(),
    code: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    shippingAmount: Joi.number(),
    minimumOrder: Joi.number(),
    forAllBuyers: Joi.boolean().required(),
    forFollowers: Joi.boolean().required(),
    applicableOn: Joi.string(),
    email: Joi.string()
      .email()
      .when('type', {
        is: VOUCHER_TYPES.NEWS_LETTER,
        then: Joi.required(),
        otherwise: Joi.optional().allow(null, ''),
      }),
    quota: Joi.number().when('type', {
      is: VOUCHER_TYPES.PRODUCT,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
    quantity: Joi.number().when('type', {
      is: VOUCHER_TYPES.PRODUCT,
      then: Joi.required(),
    }),
    eventName: Joi.string().when('type', {
      is: VOUCHER_TYPES.LIVE_STREAM,
      then: Joi.required(),
      otherwise: Joi.string().allow(null, ''),
    }),
    eventDate: Joi.date().when('type', {
      is: VOUCHER_TYPES.LIVE_STREAM,
      then: Joi.required(),
      otherwise: Joi.date().allow(null, ''),
    }),
  }).xor('shippingAmount', 'minimumOrder');
}
