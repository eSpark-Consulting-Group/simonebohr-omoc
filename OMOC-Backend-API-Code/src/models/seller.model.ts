import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { LOGIN_TYPE, MODEL_NAMES, ROLES } from '../constants';
import { IUser } from '../interfaces';
import { bcryptConfig } from '../config';

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    userName: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    countryCode: {
      type: String,
      required: false,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    password: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    isOfficial: {
      type: Boolean,
      default: false,
    },
    deviceToken: {
      type: String,
      required: false,
    },
    loginType: {
      type: String,
      enum: LOGIN_TYPE,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isRememberMe: {
      type: Boolean,
      required: true,
      default: false,
    },
    isFirstLogin: {
      type: Boolean,
      default: true,
    },
    profileImg: {
      type: String,
      required: false,
      default: '',
    },
    dob: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashPassword = await bcrypt.hash(this.password as string, bcryptConfig.salt);
  this.password = hashPassword;
});

schema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const Sellers = model(MODEL_NAMES.SELLERS, schema);
