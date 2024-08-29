import { Model, ObjectId } from 'mongoose';
import { LOGIN_TYPE, ROLES } from '../constants';
import { IBaseMongoModel } from './common.interface';
export interface IUser extends IBaseMongoModel {
  id?: string;
  profileImg?: string;
  name: string;
  userName: string;
  email: string;
  phone?: string;
  isActive: boolean;
  bio: string;
  language?: string;
  password?: string;
  countryCode?: string;
  deviceToken?: string;
  isOfficial?: boolean;
  loginType: LOGIN_TYPE;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isRememberMe?: boolean;
  isFirstLogin?: boolean;
  age?: number;
  dob?: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

export type IUserModel = Model<IUser>;
export interface IUserVerification extends IBaseMongoModel {
  userId: string;
  otp?: number;
  otpExpTime?: Date;
  resetToken?: string;
  resetTokenExp?: Date;
  wrongAttemptCount?: number;
  isPrivateAccount?: boolean;
}

export interface IBusinessVerification extends IBaseMongoModel {
  businessId: string;
  otp?: number;
  otpExpTime?: Date;
  resetToken?: string;
  resetTokenExp?: Date;
  wrongAttemptCount?: number;
  isPrivateAccount?: boolean;
}

export interface IUserInfos extends IBaseMongoModel {
  userId: string;
  interests: ObjectId[];
  isPrivateAccount: boolean;
  isTourCompleted: boolean;
  isChatTourCompleted: boolean;
}

export interface ISellerInfos extends IUserInfos {
  isAlreadySelling?: boolean;
}

export interface ISellerVerification extends IUserVerification {}

export interface IUserFollows {
  followerId: ObjectId;
  followingId: ObjectId;
  followDateTime: Date;
  unFollowDateTime: Date;
  status: string;
}

export interface IUserBlocks {
  blockerId: ObjectId;
  blockedId: ObjectId;
  blockerRole: ROLES;
  blockedRole: ROLES;
}

export interface IUserFeedHistory {
  userId: ObjectId;
  text: string;
  entityId: string;
  isDeleted: Boolean;
  type: String;
  searchAt: Date;
}
