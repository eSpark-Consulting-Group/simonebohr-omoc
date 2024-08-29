import { shippingValidations, validate } from '../validations';

shippingValidations;

import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { shopShippingController } from '../controllers';
import { checkJwt, setPagination, validateRoles, validateShop } from '../middlewares';
import { ROLES } from '../constants';

class ShippingRoutes implements IRoutes {
  public router = Router();
  public path = '/shipping';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Create shipping
    this.router.post(
      '/',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      validate(shippingValidations.createShipping),
      shopShippingController.createShopShipping,
    );

    // Get Shipping
    this.router.get('/', checkJwt, validateRoles([ROLES.SELLER]), validateShop, setPagination, shopShippingController.getAllShopShippings);

    // Get constant for shippings
    this.router.get('/region', checkJwt, shopShippingController.getShippingConstants);

    // Get Shipping
    this.router.delete('/:shippingId', checkJwt, validateRoles([ROLES.SELLER]), validateShop, shopShippingController.deleteShopShippings);

    // Get Shipping
    this.router.put(
      '/:shippingId',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      validate(shippingValidations.updateShipping),
      shopShippingController.updateShopShippings,
    );
  }
}

export const shippingRoutes = new ShippingRoutes();
