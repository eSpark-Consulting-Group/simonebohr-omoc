import Joi from 'joi';
import { objectIdValidation } from './base.validation';

class ProductCertificateValidations {
  createProductCertificate = Joi.object({
    productIds: Joi.array()
      .items({
        id: objectIdValidation.required(),
        variantId: objectIdValidation,
      })
      .required(),
  });

  updateProductCertificate = Joi.object({
    certificateId: objectIdValidation.required(),
    isAccepted: Joi.boolean().required(),
  });
}

export const productCertificateValidations = new ProductCertificateValidations();
