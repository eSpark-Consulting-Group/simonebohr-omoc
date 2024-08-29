import { NextFunction, Request, Response } from 'express';
import { ROLES } from '../constants';

export const addRoleToBody = (role: ROLES) => (req: Request, res: Response, next: NextFunction) => {
  (req as any).role = role;
  return next();
};
