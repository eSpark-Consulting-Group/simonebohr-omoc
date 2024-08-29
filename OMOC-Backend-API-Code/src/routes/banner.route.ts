import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { bannerController } from '../controllers';
import { checkJwt, validateShop } from '../middlewares';
import { bannerValidations, validate } from '../validations';

class BannerRoutes implements IRoutes {
  public router = Router();
  public path = '/banner';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', checkJwt, validate(bannerValidations.createBanner), validateShop, bannerController.createBanner);

    this.router.get('/', checkJwt, bannerController.getBanner);
  }
}

export const bannerRoutes = new BannerRoutes();
