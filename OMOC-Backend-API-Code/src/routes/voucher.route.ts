import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { voucherController } from '../controllers';
import { checkJwt, setPagination, validateRoles, validateShop } from '../middlewares';
import { ROLES } from '../constants';
import { VoucherValidations, validate } from '../validations';

class VoucherRoutes implements IRoutes {
  public router = Router();
  public path = '/voucher';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      checkJwt,
      validateRoles([ROLES.SELLER]),
      validateShop,
      validate(VoucherValidations.createVoucher),
      voucherController.createVoucher,
    );

    this.router.get('/', checkJwt, validateRoles([ROLES.SELLER]), validateShop, setPagination, voucherController.getAllVouchers);

    // Update voucher
    this.router.put('/:id', checkJwt, validateRoles([ROLES.SELLER]), validateShop, voucherController.updateVoucher);

    this.router.delete('/:id', checkJwt, validateRoles([ROLES.SELLER]), validateShop, voucherController.deleteVoucher);

    this.router.get('/:voucherId', checkJwt, validateRoles([ROLES.SELLER]), validateShop, voucherController.getVoucher);
  }
}

export const voucherRoutes = new VoucherRoutes();
