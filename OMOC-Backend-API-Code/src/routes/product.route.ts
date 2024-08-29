import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { productsController } from '../controllers';
import { setPagination, checkJwt, validateRoles, validateShop } from '../middlewares';
import { ROLES } from '../constants';
import { ProductsValidation, validate } from '../validations';

class ProductsRoutes implements IRoutes {
  public router = Router();
  public path = '/products';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Create Products
    this.router.post(
      '/',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validate(ProductsValidation.addProductValidations),
      validateShop,
      productsController.addProducts,
    );

    this.router.put('/:id', checkJwt, validateRoles([ROLES.SELLER]), validateShop, productsController.updateProducts);

    this.router.delete('/:id', checkJwt, validateRoles([ROLES.SELLER]), validateShop, productsController.deleteProducts);

    this.router.get('/seller', setPagination, checkJwt, validateRoles([ROLES.SELLER]), validateShop, productsController.getAllSellerProducts);

    this.router.get('/seller/:id', setPagination, checkJwt, validateRoles([ROLES.SELLER]), validateShop, productsController.getSellerProduct);

    this.router.get('/', checkJwt, setPagination, productsController.getAllUserProducts);

    this.router.get('/:id', checkJwt, productsController.getUserProduct);
  }
}

export const productsRoute = new ProductsRoutes();
