import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { checkJwt, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { paymentController } from '../controllers';
import { paymentValidation, validate } from '../validations';

class PaymentRoutes implements IRoutes {
  public router = Router();
  public path = '/payment';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Place Orders
    this.router.post(
      '/add-card',
      checkJwt,
      validateRoles([ROLES.USER, ROLES.SELLER]),
      //  validate(paymentValidation.addCard),
      paymentController.addCards,
    );

    this.router.get('/get-cards', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), paymentController.getAllCards);

    this.router.put('/card/:paymentId', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), paymentController.editCard);

    this.router.delete('/:paymentId', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), paymentController.deleteCard);
  }
}

export const paymentRoutes = new PaymentRoutes();
