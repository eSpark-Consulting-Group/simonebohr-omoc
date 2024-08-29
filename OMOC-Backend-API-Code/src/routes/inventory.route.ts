import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { inventoryController } from '../controllers';
import { checkJwt, setPagination, validateRoles, validateShop } from '../middlewares';
import { ROLES } from '../constants';

class InventoryRoutes implements IRoutes {
  public router = Router();
  public path = '/inventory';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', checkJwt, validateRoles([ROLES.SELLER, ROLES.ADMIN]), validateShop, setPagination, inventoryController.getInventoryData);
  }
}

export const inventoryRoutes = new InventoryRoutes();
