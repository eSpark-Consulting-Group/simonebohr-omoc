import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { ROLES } from '../constants';
import { checkJwt, validateRoles, validateShop } from '../middlewares';
import { businessController } from '../controllers';
import { AddressValidation, BusinessValidations, validate } from '../validations';

class BusinessRoutes implements IRoutes {
  public router = Router();
  public path = '/business-info';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      checkJwt,
      validateRoles([ROLES.SELLER, ROLES.ADMIN]),
      validate(BusinessValidations.businessInfos),
      businessController.saveBusinessInfos,
    );

    this.router.get('/', checkJwt, validateRoles([ROLES.SELLER, ROLES.ADMIN]), businessController.getAllBusinessInfos);

    this.router.post('/verify', checkJwt, validate(BusinessValidations.verifyBusiness), businessController.verifyBusiness);

    this.router.get('/details', checkJwt, validateRoles([ROLES.SELLER, ROLES.ADMIN]), validateShop, businessController.getBusinessBasicInfo);

    this.router.post(
      '/location',
      checkJwt,
      validateRoles([ROLES.SELLER, ROLES.ADMIN]),
      validateShop,
      validate(AddressValidation.createWarehouse),
      businessController.addBusinessLocation,
    );

    this.router.put(
      '/location',
      checkJwt,
      validateRoles([ROLES.SELLER, ROLES.ADMIN]),
      validateShop,
      validate(AddressValidation.editBusinessLocation),
      businessController.editBusinessLocation,
    );

    this.router.put(
      '/',
      checkJwt,
      validateRoles([ROLES.SELLER, ROLES.ADMIN]),
      validateShop,
      validate(BusinessValidations.editBusinessBasicInfo),
      businessController.editBasicBusinessInfo,
    );

    this.router.get('/:shopId', checkJwt, validateRoles([ROLES.SELLER, ROLES.USER]), businessController.getBusinessBasicInfoById);
  }
}

export const businessRoute = new BusinessRoutes();
