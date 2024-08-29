import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { testimonialController } from '../controllers';
import { checkJwt, setPagination, validateRoles, validateShop } from '../middlewares';
import { ROLES } from '../constants';
import { testimonialValidate, validate } from '../validations';

class TestimonialRoutes implements IRoutes {
  public router = Router();
  public path = '/testimonial';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', checkJwt, validateRoles([ROLES.SELLER]), validateShop, setPagination, testimonialController.getTestimonials);

    this.router.post('/response', checkJwt, validateRoles([ROLES.SELLER]), validateShop,
      validate(testimonialValidate.reportResponseTestimonial), testimonialController.responseTestimonial);

    this.router.post('/report', checkJwt, validateRoles([ROLES.SELLER]), validateShop,
      validate(testimonialValidate.reportResponseTestimonial), testimonialController.reportTestimonial);
  }
}

export const testimonialRoutes = new TestimonialRoutes();
