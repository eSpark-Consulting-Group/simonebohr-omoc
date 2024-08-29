import { RequestHandler } from 'express';
import { EXPIRED, HTTP_STATUS, PAGINATION, VOUCHER_TYPES } from '../constants';
import { handleResponse, logger } from '../utils';
import { Vouchers } from '../models';
import { AlreadyExistsError, NotFoundError, UnprocessableEntityError } from '../errors';
import { ICustomRequest } from '../interfaces';
import { isValidObjectId } from 'mongoose';
import { commonHelper } from '../helpers';

class VoucherController {
  createVoucher: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { code, type } = req?.body;
      const voucherFound = await Vouchers.findOne({
        code,
        type,
        shopId: userDetails?.shopId,
        isDeleted: false,
      });
      if (voucherFound) {
        throw new AlreadyExistsError(`Voucher already exists with code: ${code} and type: ${type}`);
      }
      await Vouchers.create({
        ...req.body,
        shopId: userDetails?.shopId,
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Voucher Created Successfully'));
    } catch (err) {
      logger.error(`VoucherController :: createVoucher :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllVouchers: RequestHandler = async (req, res, next) => {
    try {
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;
      const userDetails = (req as ICustomRequest)?.user;

      const type = Object.values(VOUCHER_TYPES).includes(req?.query.type as any) && req?.query?.type;

      const where: any = {
        shopId: userDetails?.shopId,
        isDeleted: false,
        ...(type && { type }),
      };

      if (req?.query?.type === EXPIRED) {
        where.endDate = {
          $gte: new Date(),
        };
      }

      const vouchersCount = await Vouchers.countDocuments(where);
      const vouchersFound = await Vouchers.find(where).limit(+pageSize).skip(+page).lean();

      const response = vouchersFound?.map(vouchers => {
        return { ...vouchers, isExpired: vouchers?.endDate < new Date() };
      });

      return res.status(HTTP_STATUS.OK).json(handleResponse('Vouchers Found', { count: vouchersCount, vouchers: response }));
    } catch (err) {
      logger.error(`VoucherController :: getVouchers :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteVoucher: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const _id = req?.params?.id;
      if (!isValidObjectId(_id)) {
        throw new UnprocessableEntityError('Enter Valid Product Id');
      }
      const voucherFound = await Vouchers.findOne({ _id, shopId: userDetails?.shopId, isDeleted: false });
      if (!voucherFound) {
        throw new NotFoundError('Voucher with this id not found for seller');
      }
      voucherFound.isDeleted = true;
      voucherFound?.save();
      return res.json(handleResponse('Deleted Successfully'));
    } catch (err) {
      logger.error(`VoucherController :: deleteVoucher :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getVoucher: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const _id = req?.params?.voucherId;
      if (!isValidObjectId(_id)) {
        throw new UnprocessableEntityError('Voucher id is not valid');
      }
      const where = {
        shopId: userDetails?.shopId,
        isDeleted: false,
        _id,
      };
      const vouchersFound = await Vouchers.findOne(where).lean();
      if (vouchersFound) {
        (vouchersFound as any).isExpired = vouchersFound?.endDate < new Date();
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Vouchers Found', vouchersFound));
    } catch (err) {
      logger.error(`VoucherController :: getVouchers :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateVoucher: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const _id = req?.params?.voucherId;

      if (!isValidObjectId(_id)) {
        throw new UnprocessableEntityError('Voucher id is not valid');
      }
      const where = {
        shopId: userDetails?.shopId,
        isDeleted: false,
        _id,
      };
      const vouchersFound = await Vouchers.findOne(where);
      if (!vouchersFound) {
        throw new NotFoundError('Voucher with this id not found for seller');
      }
      const updatedVoucher = commonHelper.assignValues(vouchersFound, req?.body);
      await updatedVoucher.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Voucher Updated Successfully', vouchersFound));
    } catch (err) {
      logger.error(`VoucherController :: updateVoucher :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const voucherController = new VoucherController();
