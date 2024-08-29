import { NextFunction, Response } from 'express';
import { jwtService } from '../services';
import { Sellers, Users } from '../models';
import { UnAuthorizedError } from '../errors';
import { logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { ROLES } from '../constants';

export const checkJwt = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = (req.header('Authorization') ?? '').split(' ')[1];

    // Checking if token is present or not
    if (!token) throw new Error('Token not found');

    // Validating user
    const payload = jwtService.verifyToken(token) as { id: string; role?: string };

    let userDetails;
    if (payload?.role === ROLES.USER) {
      userDetails = await Users.findOne({
        _id: payload.id,
        isActive: true,
      });
    }
    if (payload?.role === ROLES.SELLER) {
      userDetails = await Sellers.findOne({
        _id: payload.id,
      });
    }
    if (!userDetails) throw new Error('User not found');
    req.user = { id: userDetails?.id, role: payload?.role, isUser: payload?.role === ROLES.USER };
    return next();
  } catch (err) {
    logger.error(`Error in checkJwt middleware: ${(err as Error)?.message}`);
    return next(new UnAuthorizedError());
  }
};
