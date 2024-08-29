import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { cartController } from '../controllers';
import { checkJwt, validateRoles } from '../middlewares';
import { CartValidation, validate } from '../validations';
import { ROLES } from '../constants';

class CartRoutes implements IRoutes {
  public router = Router();
  public path = '/cart';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Add To Cart
    this.router.post('/', checkJwt, validateRoles([ROLES.USER]), validate(CartValidation.createCart), cartController.addToCart);

    // Get Cart Data
    this.router.get('/', checkJwt, validateRoles([ROLES.USER]), cartController.getCartData);

    // Remove From Cart
    this.router.post('/remove', checkJwt, validateRoles([ROLES.USER]), validate(CartValidation.deleteCart), cartController.removeFromCart);

    // Edit Cart Data
    this.router.put('/', checkJwt, validateRoles([ROLES.USER]), validate(CartValidation.editCart), cartController.editCartData);

    // Mark the tour completed for order place
    this.router.get('/tour-completed', checkJwt, validateRoles([ROLES.USER]), cartController.markTourCompleted);

    // Increment Decrement Quantity
    this.router.get(
      '/quantity/:id',
      checkJwt,
      validateRoles([ROLES.USER]),
      validate(CartValidation.operationValidation, 'query'),
      cartController.incrementDecrementItem,
    );
  }
}

export const cartRoutes = new CartRoutes();
