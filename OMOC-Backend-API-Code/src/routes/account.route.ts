import { Router } from "express";
import { IRoutes } from "../interfaces";
import { checkJwt, validateRoles, validateShop } from "../middlewares";
import { ROLES } from "../constants";
import { accountsController } from "../controllers";

class AccountRoutes implements IRoutes {

    public router = Router();
    public path = '/accounts';
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        // Create Stripe Custom Account
        this.router.post('/', checkJwt, validateRoles([ROLES.SELLER]), validateShop, accountsController.getAccountOnBoardingLink);
    }
}

export const accountRoutes = new AccountRoutes();