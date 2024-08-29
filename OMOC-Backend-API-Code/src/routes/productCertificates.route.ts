import { productCertificateValidations, validate } from '../validations';

import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { productCertificatesController } from '../controllers';
import { checkJwt, setPagination, validateRoles, validateShop } from '../middlewares';
import { ROLES } from '../constants';

class CertificateRoutes implements IRoutes {
  public router = Router();
  public path = '/certificates';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Create certificate
    this.router.post(
      '/product',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      validate(productCertificateValidations.createProductCertificate),
      productCertificatesController.createCertificateRequest,
    );

    this.router.get(
      '/product',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      setPagination,
      productCertificatesController.getCertificateList,
    );

    this.router.get(
      '/product-list',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      setPagination,
      productCertificatesController.getCertificateProductsList,
    );

    this.router.put(
      '/product',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validate(productCertificateValidations.updateProductCertificate),
      productCertificatesController.updateCertificateRequest,
    );
  }
}

export const certificateRoutes = new CertificateRoutes();
