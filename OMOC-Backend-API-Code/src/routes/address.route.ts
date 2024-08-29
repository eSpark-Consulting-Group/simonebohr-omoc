import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { addressController } from '../controllers';
import { checkJwt, setPagination, validateRoles, validateShop } from '../middlewares';
import { AddressValidation, validate } from '../validations';
import { ROLES } from '../constants';

class AddressRoutes implements IRoutes {
  public router = Router();
  public path = '/address';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    //
    this.router.get('/search', checkJwt, validateRoles([ROLES.SELLER, ROLES.USER]), addressController.searchLocationForPosts);

    // Ware House Routes
    this.router.get('/warehouse', checkJwt, validateRoles([ROLES.SELLER]), validateShop, setPagination, addressController.getAllWareHouses);

    this.router.get('/warehouse/:id', checkJwt, validateRoles([ROLES.SELLER]), validateShop, addressController.getAllWareHouses);

    this.router.post(
      '/warehouse',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validate(AddressValidation.createWarehouse),
      validateShop,
      addressController.createWareHouse,
    );

    this.router.put(
      '/warehouse/:id',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validate(AddressValidation.updateWarehouse),
      validateShop,
      addressController.updateWareHouse,
    );

    // Add Address
    this.router.post('/', checkJwt, validateRoles([ROLES.USER]), validate(AddressValidation.addAddress), addressController.addAddress);

    // Get All Address
    this.router.get('/', checkJwt, validateRoles([ROLES.USER]), setPagination, addressController.getAllAddress);

    // Update Address
    this.router.put('/:id', checkJwt, validateRoles([ROLES.USER]), validate(AddressValidation.updateAddress), addressController.updateAddress);

    // Get Particular Address
    this.router.get('/:id', checkJwt, validateRoles([ROLES.USER]), addressController.getAddressDetails);

    this.router.delete('/:addressId', checkJwt, validateRoles([ROLES.USER]), addressController.deleteAddress);
  }
}

export const addressRoutes = new AddressRoutes();
