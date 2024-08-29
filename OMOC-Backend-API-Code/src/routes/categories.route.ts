import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { categoriesController } from '../controllers';
import { checkJwt, setPagination, validateRoles, validateShop } from '../middlewares';
import { CategoryValidations, validate } from '../validations';
import { FILE_FIELDS, ROLES } from '../constants';
import { handleSingleFile } from '../middlewares/handleFiles';

class CategoryRoutes implements IRoutes {
  public router = Router();
  public path = '/categories';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Add To Cart
    this.router.post(
      '/',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      handleSingleFile(),
      validate(CategoryValidations.addCategory),
      categoriesController.addCategory,
    );

    this.router.get('/', checkJwt, validateRoles([ROLES.SELLER]), setPagination, validateShop, categoriesController.getCategories);

    this.router.get('/products', checkJwt, validateRoles([ROLES.SELLER]), validateShop, setPagination, categoriesController.getProductsForCategory);

    this.router.get('/all-list', checkJwt, categoriesController.getAllCategoriesForUser);

    this.router.get('/:id', checkJwt, validateRoles([ROLES.SELLER]), validateShop, categoriesController.getCategory);

    this.router.put(
      '/:id',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      handleSingleFile(),
      validate(CategoryValidations.updateCategory),
      categoriesController.updateCategory,
    );

    this.router.delete('/:id', checkJwt, validateRoles([ROLES.SELLER]), validateShop, categoriesController?.deleteCategory);
  }
}

export const categoriesRoutes = new CategoryRoutes();
