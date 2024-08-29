import { sign, verify, decode, JwtPayload } from 'jsonwebtoken';
import { configs } from '../config';

class JwtService {
  verifyToken = (token: string): string | JwtPayload => {
    const decoded = verify(token, configs.JWT_SECRET_KEY);
    return decoded;
  };

  decodeToken = (token: string) => {
    return decode(token);
  };

  signToken = (userData: { id: string; role?: string }): string => {
    return sign(userData, configs.JWT_SECRET_KEY, {
      expiresIn: configs.EXPIRES_IN,
    });
  };
}

export const jwtService = new JwtService();
