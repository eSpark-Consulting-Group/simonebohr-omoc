import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { checkJwt, setPagination, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { ordersController } from '../controllers';
import { OrdersValidation, validate } from '../validations';

class OrderRoutes implements IRoutes {
  public router = Router();
  public path = '/orders';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Place Orders
    this.router.post('/', checkJwt, validateRoles([ROLES.USER]), validate(OrdersValidation.placeOrder), ordersController.placeOrder);

    this.router.get('/', checkJwt, validateRoles([ROLES.USER]), setPagination, ordersController.getUsersOrders);
  }
}

export const orderRoutes = new OrderRoutes();
