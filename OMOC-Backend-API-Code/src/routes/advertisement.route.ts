import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { advertisementController } from '../controllers';
import { checkJwt, validateShop } from '../middlewares';
import { advertisementValidation, validate } from '../validations';

class AdvertisementRoutes implements IRoutes {
  public router = Router();
  public path = '/advertisement';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', checkJwt, validateShop, validate(advertisementValidation.createAdvertisement), advertisementController.createAdvertisement);

    // this.router.get('/', check)
  }
}

export const advertisementRoutes = new AdvertisementRoutes();
