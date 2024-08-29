import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { faqController } from '../controllers';
import { setPagination, checkJwt, validateRoles, validateShop, addToBody } from '../middlewares';
import { FAQ_TYPES, ROLES } from '../constants';
import { faqValidation, validate } from '../validations';

class FaqRoutes implements IRoutes {
  public router = Router();
  public path = '/faq';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Create General Faq
    this.router.post(
      '/general',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      addToBody({
        type: FAQ_TYPES.GENERAL,
      }) as any,
      validate(faqValidation.createFaq),
      faqController.createFAQ,
    );

    // Create products Faq
    this.router.post(
      '/product',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      addToBody({
        type: FAQ_TYPES.PRODUCT,
      }) as any,
      validate(faqValidation.createFaq),
      faqController.createFAQ,
    );

    // Get All General Faqs
    this.router.get('/general', checkJwt, validateRoles([ROLES.SELLER]), validateShop, setPagination, faqController.getGeneralFAQ);

    // Get Product List having Faq
    this.router.get('/product', checkJwt, validateRoles([ROLES.SELLER]), validateShop, setPagination, faqController.getProductsFaq);

    this.router.get('/product/:productId', checkJwt, validateRoles([ROLES.SELLER]), validateShop, faqController.getFaqByProductId);
  }
}

export const faqRoute = new FaqRoutes();
