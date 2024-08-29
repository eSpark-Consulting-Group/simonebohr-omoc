import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { wishListController } from '../controllers';
import { checkJwt, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { validate, wishListValidations } from '../validations';

class WishListRoutes implements IRoutes {
  public router = Router();
  public path = '/wishlist';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Ware House Routes
    this.router.post('/', checkJwt, validateRoles([ROLES.USER]), validate(wishListValidations.createWishList), wishListController.createWishLists);

    this.router.get('/', checkJwt, validateRoles([ROLES.USER]), wishListController.getAllWishList);

    this.router.post('/add-product', checkJwt, validateRoles([ROLES.USER]), wishListController.addProductToWishList);

    this.router.post('/delete-product', checkJwt, validateRoles([ROLES.USER]), wishListController.removeProductToWishList);

    this.router.get('/products/:wishListId', checkJwt, validateRoles([ROLES.USER]), wishListController.getWishListProducts);
  }
}

export const wishListRoutes = new WishListRoutes();
