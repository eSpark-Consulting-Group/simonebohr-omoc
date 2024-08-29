import { Router } from 'express';
import { AuthControllerInstance } from '../controllers';
import { type IRoutes } from '../interfaces';
import { ROLES, RoutesConstants } from '../constants';
import { AuthValidation, validate } from '../validations';
import { addRoleToBody, checkJwt } from '../middlewares';

class AuthRoutes implements IRoutes {
  public router = Router();
  private authRoutes = RoutesConstants.AUTH;
  public path = this.authRoutes.DEFAULT;
  private sellerRoutes = this.authRoutes.SELLER;
  private userRoutes = this.authRoutes.USER;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @description Auth Routes for seller
     */
    this.router.post(this.sellerRoutes.SIGNUP, validate(AuthValidation.signupSeller), AuthControllerInstance.registerSeller);

    this.router.post(this.sellerRoutes.LOGIN, validate(AuthValidation.LoginValidations), AuthControllerInstance.loginSeller);

    this.router.post(this.sellerRoutes.VERIFY_OTP, validate(AuthValidation.verifyOtp), AuthControllerInstance.verifyOtp);

    // Google Auth
    this.router.get('/seller/google', addRoleToBody(ROLES.SELLER), AuthControllerInstance.googleAuthSeller);

    this.router.get('/user/google', addRoleToBody(ROLES.SELLER), AuthControllerInstance.googleAuthUser);

    /**
     * @description Auth Routes for user
     */
    this.router.post(this.userRoutes.SIGNUP, validate(AuthValidation.signupUser), AuthControllerInstance.registerUser);

    this.router.post(this.userRoutes.LOGIN, addRoleToBody(ROLES.USER), validate(AuthValidation.LoginValidations), AuthControllerInstance.loginUser);

    this.router.post(this.userRoutes.VERIFY_OTP, addRoleToBody(ROLES.USER), validate(AuthValidation.verifyOtp), AuthControllerInstance.verifyOtp);
    // Google Auth
    this.router.get('/user-web/google', addRoleToBody(ROLES.USER), AuthControllerInstance.googleAuth);

    this.router.get('/seller-web/google', addRoleToBody(ROLES.SELLER), AuthControllerInstance.googleAuth);

    this.router.post('/user/resend-otp', addRoleToBody(ROLES.SELLER), validate(AuthValidation.resendOtp), AuthControllerInstance.resendOtp);

    this.router.post('/seller/resend-otp', addRoleToBody(ROLES.SELLER), validate(AuthValidation.resendOtp), AuthControllerInstance.resendOtp);

    this.router.post('/user/forgot-password', validate(AuthValidation.resendOtp), addRoleToBody(ROLES.USER), AuthControllerInstance.forgotPassword);

    this.router.post(
      '/seller/forgot-password',
      validate(AuthValidation.resendOtp),
      addRoleToBody(ROLES.SELLER),
      AuthControllerInstance.forgotPassword,
    );

    this.router.post(
      '/user/verify-password-otp',
      validate(AuthValidation.verifyOtp),
      addRoleToBody(ROLES.USER),
      AuthControllerInstance.verifyOtpForPassword,
    );

    this.router.post(
      '/seller/verify-password-otp',
      validate(AuthValidation.verifyOtp),
      addRoleToBody(ROLES.SELLER),
      AuthControllerInstance.verifyOtpForPassword,
    );

    this.router.post(
      '/user/change-password',
      validate(AuthValidation.passwordReset),
      addRoleToBody(ROLES.USER),
      AuthControllerInstance.changePassword,
    );

    this.router.post(
      '/seller/change-password',
      validate(AuthValidation.passwordReset),
      addRoleToBody(ROLES.SELLER),
      AuthControllerInstance.changePassword,
    );
  }
}

export const authRoute = new AuthRoutes();
