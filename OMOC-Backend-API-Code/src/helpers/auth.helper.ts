import { EXPIRATION_TIME, ROLES } from '../constants';
import { IUser, IUserVerification } from '../interfaces';
import { SellerVerifications, Sellers, UserVerifications, Users } from '../models';
import { generateOTP, getTime } from '../utils';
import { commonHelper } from './common.helper';

export class AuthHelper {
  async createUser(userDetails: IUser) {
    const user = await Users.create({
      ...(userDetails?.email && { email: userDetails?.email }),
      password: userDetails?.password,
      ...(userDetails?.phone && { phone: userDetails?.phone }),
      name: userDetails?.name,
      userName: userDetails?.userName,
      loginType: userDetails?.loginType,
      deviceToken: userDetails?.deviceToken,
      countryCode: userDetails?.countryCode,
      age: userDetails?.age,
    });
    const userInfoData: IUserVerification = {
      userId: user?.id,
      otp: generateOTP(),
      otpExpTime: getTime(EXPIRATION_TIME.OTP),
    };
    await UserVerifications.create(userInfoData);

    return { user, userInfos: userInfoData };
  }

  async findOrCreateUser(userDetails: IUser, role: ROLES, findType: 'phone' | 'email') {
    const model = role === ROLES.SELLER ? Sellers : Users;
    const userFound = await model.findOne({ [findType]: userDetails[findType] });
    if (!userFound) {
      const results = await model.create({ ...userDetails, isFirstLogin: false });
      return { id: results?.id, [findType]: results[findType], isFirstLogin: true };
    } else {
      commonHelper.assignValues(userFound, userDetails);
    }
    if (userFound?.isFirstLogin) {
      userFound.isFirstLogin = false;
      await userFound.save();
    }
    return userFound;
  }

  async getUserDetails(where: any, role: ROLES) {
    const model = role === ROLES.SELLER ? Sellers : Users;
    return model.findOne(where);
  }

  async getUserVerification(where: any, role: ROLES) {
    const model = role === ROLES.SELLER ? SellerVerifications : UserVerifications;
    return model.findOne(where);
  }

  async createUserVerification(data: any, role: ROLES) {
    const model = role === ROLES.SELLER ? SellerVerifications : UserVerifications;
    return model.create(data);
  }
}

export const authHelper = new AuthHelper();
