import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils';

export const addToBody = (data: any) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = { ...data, ...req.body };
    return next();
  } catch (err) {
    logger.error(`Error in addToBody :: ${(err as Error).message}`);
    return next(err);
  }
};
