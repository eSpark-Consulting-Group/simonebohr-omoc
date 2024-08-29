import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { HTTP_STATUS } from '../constants';

class InventoryController {
  getInventoryData: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      return res.status(HTTP_STATUS.OK).json(handleResponse('Inventory data'));
    } catch (err) {
      logger.error(`InventoryController :: getInventoryData :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}
export const inventoryController = new InventoryController();
