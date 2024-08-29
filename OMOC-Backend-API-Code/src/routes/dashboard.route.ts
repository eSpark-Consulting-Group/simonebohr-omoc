import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { dashboardController } from '../controllers';
import { checkJwt, setPagination, validateRoles, validateShop } from '../middlewares';
import { ROLES } from '../constants';

class DashboardRoutes implements IRoutes {
  public router = Router();
  public path = '/dashboard';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Create Products
    this.router.get('/', checkJwt, validateRoles([ROLES.SELLER, ROLES.ADMIN]), validateShop, dashboardController.getDashBoardData);

    this.router.get(
      '/orders',
      checkJwt,
      validateRoles([ROLES.SELLER, ROLES.ADMIN]),
      validateShop,
      setPagination,
      dashboardController.getSellersOrdersList,
    );


    this.router.post('/fulfill',checkJwt,validateRoles([ROLES.SELLER]),validateShop,dashboardController.fulFillOrder)
  }
}

export const dashboardRoutes = new DashboardRoutes();
