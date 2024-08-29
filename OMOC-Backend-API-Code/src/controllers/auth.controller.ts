import { NextFunction, Request, RequestHandler, Response } from 'express';
import { generateOTP, generateToken, getTime, handleResponse, logger } from '../utils';
import { BusinessInfos, Sellers, UserInfos, UserVerifications, Users } from '../models';
import { AlreadyExistsError, ApiError, BadRequestError, NotFoundError, UnAuthorizedError, UnprocessableEntityError } from '../errors';
import { EXPIRATION_TIME, HTTP_STATUS, LOGIN_TYPE, ROLES } from '../constants';
import { authHelper, commonHelper, userHelper } from '../helpers';
import { ICustomRequest, IUser, IUserVerification } from '../interfaces';
import { googleAuth, jwtService, mailService } from '../services';

class AuthController {
  handleSocialLogin: RequestHandler = async (req, res, next) => {
    try {
      return res.status(HTTP_STATUS.OK).json(handleResponse('its under development'));
    } catch (err: unknown) {
      logger.error(`AuthController :: handleSocialLogin :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  /**
   * @description Controller to handle signup
   */
  registerSeller: RequestHandler = async (req, res, next) => {
    try {
      const { email, password, phone, countryCode, dob } = req?.body;
      const getUserDetails = await authHelper.getUserDetails({ ...(phone ? { phone } : { email }) }, ROLES.SELLER);
      if (getUserDetails) {
        throw new AlreadyExistsError('Seller Already Exists');
      }
      const userFound = await Sellers.create({ email, password, phone, countryCode, loginType: LOGIN_TYPE.MANUAL, dob });
      const token = jwtService.signToken({ id: userFound?.id, role: ROLES.SELLER });

      const response = {
        user: { _id: userFound?.id, email: userFound?.email, phone: userFound?.phone },
        token,
        role: ROLES.SELLER,
        isShopExists: false,
      };
      return res.status(HTTP_STATUS.OK).json(handleResponse('Sign Up Successfully', response));
    } catch (err) {
      logger.error(`AuthController :: registerSeller :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  loginSeller = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, phone } = req?.body;
      const userFound = await authHelper.getUserDetails({ ...(phone ? { phone } : { email }) }, ROLES.SELLER);

      if (!userFound) {
        throw new UnAuthorizedError('Seller Not Found');
      }

      if (!(await userFound?.comparePassword(password))) {
        throw new UnAuthorizedError('Invalid Password');
      }
      const getShopDetails = await BusinessInfos.findOne({
        userId: userFound?.id,
        isVerified: true,
      });
      const token = jwtService.signToken({ id: userFound?.id, role: ROLES.SELLER });
      const response = {
        user: {
          _id: userFound?.id,
          email: userFound?.email,
          phone: userFound?.phone,
          name: userFound?.name,
          userName: userFound?.userName,
          profileImg: userFound?.profileImg,
        },
        token,
        role: ROLES.SELLER,
        isShopExists: !!getShopDetails?.id,
        shopDetails: getShopDetails,
      };
      return res.status(HTTP_STATUS.OK).json(handleResponse('Login Successful', response));
    } catch (err) {
      logger.error(`AuthController :: loginSeller :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, email, password, name, phone, deviceToken, countryCode, age, dob } = req?.body;

      const loginType = LOGIN_TYPE.MANUAL;

      const userFound = await Users.findOne({
        ...(phone ? { phone } : { email }),
        isActive: true,
      });

      if (!userFound) {
        const { user } = await authHelper.createUser({
          userName,
          email,
          password,
          name,
          phone,
          deviceToken,
          countryCode,
          loginType,
          age,
          dob,
        } as IUser);

        return res.status(HTTP_STATUS.OK).json(
          handleResponse('User Registered Successfully', {
            user: {
              _id: user?.id,
              email: user?.email,
              phone: user?.phone,
            },
          }),
        );
      } else {
        if (userFound?.isEmailVerified || userFound?.isPhoneVerified) {
          throw new AlreadyExistsError('User Already Exists');
        }
        const userUpdated = commonHelper.assignValues(userFound, { password, phone, name, deviceToken, countryCode, userName });
        await userUpdated.save();
        const userVerification = await UserVerifications.findOne({ userId: userFound?.id });
        if (userVerification) {
          userVerification.otp = generateOTP();
          userVerification.otpExpTime = getTime(EXPIRATION_TIME.OTP);
          await userVerification.save();
          return res
            .status(HTTP_STATUS.OK)
            .json(handleResponse('User Registered Successfully', { user: { _id: userFound?.id, email: userFound?.email, phone: userFound?.phone } }));
        } else {
          const userFoundUpdated = commonHelper.assignValues(userFound, { password, name, deviceToken, countryCode });
          userFoundUpdated.save();
          const userVerificationData: IUserVerification = {
            userId: userFound?.id,
            otp: generateOTP(),
            otpExpTime: getTime(EXPIRATION_TIME.OTP),
          };
          await UserVerifications.create(userVerificationData);
          return res
            .status(HTTP_STATUS.OK)
            .json(handleResponse('User Registered Successfully', { user: await userHelper.prepareProfileResponse(userFound) }));
        }
      }
    } catch (err) {
      logger.error(`AuthController :: registerUser :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  loginUser = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const { email, password, phone } = req?.body;
      const role = req?.role;
      let userFound = await Users.findOne({ ...(phone ? { phone } : { email }), isActive: true });

      if (!userFound) {
        throw new UnAuthorizedError('User Not Found');
      }
      if ((phone && !userFound?.isPhoneVerified) || (email && !userFound?.isEmailVerified)) {
        throw new ApiError('User Not Verified', HTTP_STATUS.BAD_REQUEST);
      }

      const matchPassword = await userFound?.comparePassword(password);
      if (!matchPassword) throw new UnAuthorizedError('Invalid password');
      const token = jwtService.signToken({
        id: userFound?.id,
        role,
      });

      const isFirstLogin = !!userFound?.isFirstLogin;
      if (isFirstLogin) {
        userFound.isFirstLogin = false;
        userFound.save();
      }

      return res.status(HTTP_STATUS.OK).json(
        handleResponse(`${role} Logged In Successfully`, {
          user: await userHelper.prepareProfileResponse(userFound),
          token,
          role,
          isFirstLogin,
        }),
      );
    } catch (err) {
      logger.error(`AuthController :: login :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  verifyOtp = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const { otp, phone, email } = req?.body;
      const userFound = await Users.findOne({ ...(phone ? { phone } : { email }), isActive: true });
      if (!userFound) {
        throw new ApiError('User not found', HTTP_STATUS.BAD_REQUEST);
      }
      if (userFound?.isEmailVerified || userFound?.isPhoneVerified) {
        throw new BadRequestError('User already verified');
      }
      const userVerifications = await UserVerifications.findOne({ userId: userFound?.id });

      if (!userVerifications) throw new NotFoundError(`User Verification not found`);

      if ((userVerifications?.otpExpTime as Date) < new Date()) {
        throw new ApiError('OTP Expired', HTTP_STATUS.BAD_REQUEST);
      }
      if (+(userVerifications?.otp ?? 0) !== +otp) {
        throw new ApiError('Invalid OTP', HTTP_STATUS.BAD_REQUEST);
      }
      if (email) userFound.isEmailVerified = true;
      if (phone) userFound.isPhoneVerified = true;

      const isFirstLogin = userFound.isFirstLogin;

      if (isFirstLogin) userFound.isFirstLogin = false;
      userVerifications.otp = undefined;
      userVerifications.otpExpTime = undefined;

      Promise.all([userVerifications.save(), userFound.save()]);

      const token = jwtService.signToken({
        id: userFound?.id,
        role: ROLES.USER,
      });
      return res.status(HTTP_STATUS.OK).json(
        handleResponse('verify Otp successfully', {
          user: await userHelper.prepareProfileResponse(userFound),
          token,
          isFirstLogin,
        }),
      );
    } catch (err) {
      logger.error(`AuthController :: verifyOtp :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  googleAuth = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req?.query?.token;
      const role = req?.role;
      if (!token) throw new NotFoundError('Token not Found');
      const response = await googleAuth.verifyIdToken(token as string);
      if (response?.error) {
        throw new ApiError(response?.error, HTTP_STATUS.BAD_REQUEST);
      }
      const userData = commonHelper.assignValues(
        {},
        {
          name: response?.name,
          profileImg: response?.picture,
          email: response?.email,
        },
      );
      const userDetails = await authHelper.findOrCreateUser({ ...userData, loginType: LOGIN_TYPE.GOOGLE } as IUser, role as ROLES, 'email');

      const jwtToken = jwtService.signToken({
        id: userDetails?.id,
        role,
      });
      const returnResponse: any = {
        user: {
          _id: userDetails?.id,
          email: userDetails?.email,
          profileImg: userDetails?.profileImg,
          name: userDetails?.name ?? '',
          userName: userDetails?.userName ?? '',
        },
        token: jwtToken,
        isFirstLogin: userDetails?.isFirstLogin,
      };

      if (role === ROLES.SELLER) {
        const shop = await BusinessInfos.findOne({
          userId: userDetails?.id,
          isVerified: true,
        });
        returnResponse.role = ROLES.SELLER;
        returnResponse.isShopExists = !!shop?.id;
        returnResponse.shopDetails = shop ?? {};
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Login successfully', returnResponse));
    } catch (err) {
      logger.error(`AuthController :: googleAuth :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  googleAuthSeller: RequestHandler = async (req, res, next) => {
    try {
      const token = (req.header('Authorization') ?? '').split(' ')[1];

      // Checking if token is present or not
      if (!token) throw new ApiError('Token not found', 401);

      // Validating user
      const payload: any = jwtService.decodeToken(token);
      const email = payload?.email;
      if (!email) {
        throw new ApiError('Email not found', 422);
      }
      const userExists = await Sellers.findOne({ email });
      if (userExists) {
        const getShopDetails = await BusinessInfos.findOne({
          userId: userExists?.id,
          isVerified: true,
        });
        const signedToken = jwtService.signToken({ id: userExists?.id, role: ROLES.SELLER });
        const isFirstLogin = !!userExists?.isFirstLogin;
        if (isFirstLogin) {
          userExists.isFirstLogin = false;
          userExists.save();
        }
        const response = {
          user: { _id: userExists?.id, email: userExists?.email, phone: userExists?.phone },
          token: signedToken,
          role: ROLES.SELLER,
          isShopExists: !!getShopDetails?.id,
          shopDetails: getShopDetails,
        };
        return res.status(HTTP_STATUS.OK).json(handleResponse('Login Successful', response));
      } else {
        const createSeller = await Sellers.create({
          name: payload?.name || `${payload?.given_name ?? ''} ${payload?.family_name}`,
          email: payload?.email ?? '',
          loginType: LOGIN_TYPE.GOOGLE,
          isEmailVerified: payload?.email_verified || false,
          isFirstLogin: true,
          picture: payload?.picture,
        });

        const signedToken = jwtService.signToken({ id: createSeller?.id, role: ROLES.SELLER });

        const response = {
          user: {
            _id: createSeller?.id,
            email: createSeller?.email,
            phone: createSeller?.phone,
            name: createSeller?.name,
            userName: createSeller?.userName,
            profileImg: createSeller?.profileImg,
          },
          token: signedToken,
          role: ROLES.SELLER,
          isShopExists: false,
          shopDetails: null,
        };
        return res.status(HTTP_STATUS.OK).json(handleResponse('Login successful', response));
      }
    } catch (err: unknown) {
      logger.error(`AuthController :: googleAuthSeller :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  googleAuthUser: RequestHandler = async (req, res, next) => {
    try {
      const token = (req.header('Authorization') ?? '').split(' ')[1];
      const role = ROLES.USER;
      // Checking if token is present or not
      if (!token) throw new ApiError('Token not found', 401);

      // Validating user
      const payload: any = jwtService.decodeToken(token);
      const email = payload?.email;
      if (!email) {
        throw new ApiError('Email not found', 422);
      }
      const userFound = await Users.findOne({ email, isActive: true });
      if (userFound) {
        const isFirstLogin = !!userFound?.isFirstLogin;
        if (isFirstLogin) {
          userFound.isFirstLogin = false;
          userFound.save();
        }

        const signedToken = jwtService.signToken({ id: userFound?.id, role });

        return res.status(HTTP_STATUS.OK).json(
          handleResponse(`Logged In Successfully`, {
            user: await userHelper.prepareProfileResponse(userFound),
            token: signedToken,
            role,
            isFirstLogin: userFound?.isFirstLogin,
          }),
        );
      } else {
        const userCreated = await Users.create({
          name: payload?.name || `${payload?.given_name ?? ''} ${payload?.family_name}`,
          email: payload?.email ?? '',
          loginType: LOGIN_TYPE.GOOGLE,
          isEmailVerified: payload?.email_verified || false,
          isFirstLogin: true,
          profileImg: payload?.picture,
        });
        await UserInfos.create({ userId: userCreated?.id });
        const signedToken = jwtService.signToken({ id: userCreated?.id, role });
        return res.status(HTTP_STATUS.OK).json(
          handleResponse('Logged in Successfully', {
            user: await userHelper.prepareProfileResponse(userFound),
            token: signedToken,
            role,
            isFirstLogin: true,
          }),
        );
      }
    } catch (err: unknown) {
      logger.error(`AuthController :: googleAuthUser :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  resendOtp: RequestHandler = async (req, res, next) => {
    try {
      const role = (req as any)?.role as ROLES;
      const { phone, email } = req?.body;
      const userFound = await authHelper.getUserDetails({ ...(phone ? { phone } : { email }) }, role);
      if (!userFound) {
        throw new ApiError('User not found', HTTP_STATUS.BAD_REQUEST);
      }
      const userVerification = await authHelper.getUserVerification({ userId: userFound?.id }, role);
      if (userVerification) {
        userVerification.otp = generateOTP();
        userVerification.otpExpTime = getTime(EXPIRATION_TIME.OTP);
        await userVerification.save();
      } else {
        const userVerificationData: IUserVerification = {
          userId: userFound?.id,
          otp: generateOTP(),
          otpExpTime: getTime(EXPIRATION_TIME.OTP),
        };
        await authHelper.createUserVerification(userVerificationData, role);
      }
      return res
        .status(HTTP_STATUS.OK)
        .json(handleResponse('OTP SEND SUCCESSFULLY', { user: { _id: userFound?.id, email: userFound?.email, phone: userFound?.phone } }));
    } catch (err) {
      logger.error(`AuthController :: resendOtp :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  forgotPassword = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const role = req?.role as ROLES;
      const { email, phone, countryCode } = req?.body;
      const where: Partial<IUser> = { ...(phone ? { phone } : { email }) };
      if (email) {
        where.loginType = LOGIN_TYPE.MANUAL;
      }
      const userFound = await authHelper.getUserDetails(where, role);

      if (!userFound) {
        throw new AlreadyExistsError('Invalid email/phone');
      }

      const userVerification = await authHelper.getUserVerification({ userId: userFound?.id }, role);
      const otp = generateOTP();
      const otpExpTime = getTime(EXPIRATION_TIME.OTP);

      if (userVerification) {
        userVerification.otp = otp;
        userVerification.otpExpTime = otpExpTime;
        await userVerification.save();
      } else {
        const userVerificationData: IUserVerification = {
          userId: userFound?.id,
          otp,
          otpExpTime,
        };
        await authHelper.createUserVerification(userVerificationData, role);
      }

      if (email) {
        await mailService.forgotPassword({
          name: userFound?.name,
          email: userFound?.email,
          otp: otp,
          role: role,
        });
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Otp Sent successfully'));
    } catch (err) {
      logger.error(`AuthController :: forgotPassword :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  verifyOtpForPassword = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const role = (req as any)?.role as ROLES;
      const { otp, phone, email } = req?.body;
      // Checking user
      const userFound = await authHelper.getUserDetails({ ...(phone ? { phone } : { email }) }, role);

      if (!userFound) {
        throw new ApiError('User not found', HTTP_STATUS.BAD_REQUEST);
      }

      const userVerifications = await authHelper.getUserVerification({ userId: userFound?.id }, role);

      if (!userVerifications) throw new NotFoundError(`User Verification not found`);

      if ((userVerifications?.otpExpTime as Date) < new Date()) {
        throw new ApiError('OTP Expired', HTTP_STATUS.BAD_REQUEST);
      }
      if (+(userVerifications?.otp ?? 0) !== +otp) {
        throw new ApiError('Invalid OTP', HTTP_STATUS.BAD_REQUEST);
      }

      userVerifications.otp = undefined;
      userVerifications.otpExpTime = undefined;

      const token = generateToken();
      userVerifications.resetToken = token;
      userVerifications.resetTokenExp = getTime(EXPIRATION_TIME.TOKEN);

      Promise.all([userVerifications.save(), userFound.save()]);

      return res.status(HTTP_STATUS.OK).json(
        handleResponse('verify Otp successfully', {
          token,
        }),
      );
    } catch (err) {
      logger.error(`AuthController :: verifyOtpForPassword :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  changePassword = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const role = req?.role as ROLES;

      const { password, token } = req?.body;

      if (!token) {
        throw new UnprocessableEntityError('Token is required');
      }

      const userVerifications = await authHelper.getUserVerification({ resetToken: token }, role);

      if (!userVerifications) throw new NotFoundError(`User Verification not found`);

      const userFound = await authHelper.getUserDetails(
        {
          _id: userVerifications?.userId,
        },
        role,
      );

      if (!userFound) {
        throw new NotFoundError(`User not found`);
      }

      if ((userVerifications?.resetTokenExp as Date) < new Date()) {
        throw new ApiError('Token Expired', HTTP_STATUS.BAD_REQUEST);
      }
      userFound.password = password;
      await userFound.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Password Updated Successfully'));
    } catch (err) {
      logger.error(`AuthController :: changePassword :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const AuthControllerInstance = new AuthController();
