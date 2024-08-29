import crypto from 'crypto';
import { EXPIRATION_TIME, HTTP_STATUS, NODE_ENVS, ONE_MIN_MS, OTP_LENGTH, TOKEN_LENGTH, videoExtensions } from '../constants';
import { configs } from '../config';
/**
 * @description : For set success response data
 * @param message
 * @param data
 * @returns : Set success response data
 */
export const handleResponse = (message = 'SUCCESS', data: unknown = null, statusCode: number = HTTP_STATUS.OK) => {
  return {
    status: true,
    data: data,
    message: message,
    statusCode,
  };
};

export const generateOTP = (length: number = OTP_LENGTH): number => {
  const characters = '0123456789';
  let otp = '';
  if (configs.NODE_ENV === NODE_ENVS.DEVELOPMENT) return 1234;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }
  return +otp;
};

export const getTime = (value: number = EXPIRATION_TIME.OTP, duration: 'min' | 'hour' = 'min', operation: 'add' | 'substract' = 'add') => {
  const milliseconds = duration === 'min' ? value * ONE_MIN_MS : value * 60 * ONE_MIN_MS;
  if (operation === 'add') {
    return new Date(Date.now() + milliseconds);
  } else {
    return new Date(Date.now() - milliseconds);
  }
};

export const generateToken = (length: number = TOKEN_LENGTH) => {
  let tokenLength = length;
  if (!Number.isInteger(length) || length <= 0) {
    tokenLength = TOKEN_LENGTH;
  }
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  const token = randomBytes.toString('hex').slice(0, length);
  return token;
};

export function calculateIsNext(totalCount: number, offset: number, limit: number) {
  const currentCount = offset + limit;
  return currentCount < totalCount;
}

export const getValuesFromArray = (data: any[], key: string = '_id') => {
  return data?.map(data => data[key]);
};

export const isValidUrl = (url: string, extensionsArray = videoExtensions) => {
  const fileExtension = url?.split('.')?.pop()?.toLowerCase();
  return extensionsArray.includes('.' + fileExtension);
};
