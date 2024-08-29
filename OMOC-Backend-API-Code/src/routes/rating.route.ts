import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { ratingController } from '../controllers';
import { checkJwt, setPagination, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { ReviewValidations, validate } from '../validations';

class RatingRoutes implements IRoutes {
  public router = Router();
  public path = '/rating';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', checkJwt, validateRoles([ROLES.USER]), setPagination, ratingController.getUserRatings);

    this.router.post('/', checkJwt, validateRoles([ROLES.USER]), validate(ReviewValidations.reviewProduct), ratingController.giveProductRating);
  }
}

export const ratingRoute = new RatingRoutes();
