import { RequestHandler } from 'express';
import { ICustomRequest } from '../interfaces';
import { handleResponse, logger } from '../utils';
import { HTTP_STATUS, PAGINATION } from '../constants';
import { BusinessInfos, UserAddress, WareHouses } from '../models';
import { AlreadyExistsError, BadRequestError, NotFoundError } from '../errors';
import { commonHelper } from '../helpers';
import { apiService } from '../services';

export class AddressController {
  addAddress: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { name, address, region, phoneNumber, city, zipCode, country, isActive, isPrimary, icon, lat, long } = req?.body;
      if (isPrimary) {
        // update user address to false
        const addressFound = await UserAddress.findOne({ userId: userDetails?.id, isPrimary: true, isActive: true });
        if (addressFound) {
          addressFound.isPrimary = false;
          addressFound.save();
        }
      }
      const saveAddress = await UserAddress.create({
        userId: userDetails?.id,
        name,
        address,
        region,
        phoneNumber,
        city,
        zipCode,
        country,
        isActive,
        isPrimary,
        icon,
        lat,
        long,
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Address Has been added successfully', saveAddress));
    } catch (err) {
      logger.error(`AddressController :: addAddress :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateAddress: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { isPrimary } = req?.body;
      const addressFound = await UserAddress.findOne({
        userId: userDetails?.id,
        _id: req.params?.id,
        isActive: true,
      });
      if (!addressFound) {
        throw new NotFoundError('Address For this user not found');
      }
      if (isPrimary) {
        const oldPrimaryAddress = await UserAddress.findOne({ userId: userDetails?.id, isPrimary: true });
        if (oldPrimaryAddress) {
          oldPrimaryAddress.isPrimary = false;
          oldPrimaryAddress.save();
        }
      }
      const updatedData = commonHelper.assignValues(addressFound, req?.body);
      updatedData.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Address Has been updated successfully'));
    } catch (err) {
      logger.error(`AddressController :: updateAddress :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllAddress: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize, page } = req?.query;
      const { isPrimary } = req?.query;
      const addressFound = await UserAddress.find({ userId: userDetails?.id, isActive: true, ...(isPrimary && { isPrimary: true }) })
        .limit(+(pageSize as unknown as number))
        .skip(+(page as unknown as number));
      return res.status(HTTP_STATUS.OK).json(handleResponse('Address Found', addressFound));
    } catch (err) {
      logger.error(`AddressController :: getAllAddress :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAddressDetails: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const _id = req.params.id;
      const addressFound = await UserAddress.findOne({ userId: userDetails?.id, isActive: true, _id });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Address Found', addressFound));
    } catch (err) {
      logger.error(`AddressController :: getAllAddress :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteAddress: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const _id = req?.params?.addressId;
      const addressFound = await UserAddress.findOne({
        _id,
        userId: userDetails?.id,
        isActive: true,
      });
      if (!addressFound) {
        throw new NotFoundError('Address Not Found with this Id for the user');
      }
      addressFound.isActive = false;
      addressFound?.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Address Has been deleted successfully', { _id: addressFound?.id }));
    } catch (err) {
      logger.error(`AddressController :: deleteAddress :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  createWareHouse: RequestHandler = async (req, res, next) => {
    const userDetails = (req as ICustomRequest)?.user;
    try {
      const { name, address, region, city, zipCode, country, lat, long } = req?.body;

      const wareHouseFound = await WareHouses.findOne({ businessId: userDetails?.shopId, name });
      if (wareHouseFound) {
        throw new AlreadyExistsError('WareHouse with this name already exists');
      }
      const wareHouseCreated = await WareHouses.create({
        businessId: userDetails?.shopId,
        name,
        address,
        city,
        country,
        region,
        lat,
        long,
        zipCode,
      });
      return res.status(HTTP_STATUS.CREATED).json(handleResponse('WareHouse Created SuccessFully', wareHouseCreated, HTTP_STATUS.CREATED));
    } catch (err) {
      logger.error(`AddressController :: createWareHouse :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateWareHouse: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { name, address, region, city, zipCode, country, lat, long } = req?.body;
      const _id = req.params.id;
      const wareHouseFound = await WareHouses.findOne({
        _id,
        businessId: userDetails?.shopId,
      });
      if (!wareHouseFound) {
        throw new NotFoundError('warehouse not found');
      }
      const updatedWareHouseData = commonHelper.assignValues(wareHouseFound, {
        name,
        address,
        region,
        city,
        zipCode,
        country,
        lat,
        long,
      });
      await updatedWareHouseData.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('WareHouse updated Successfully', updatedWareHouseData));
    } catch (err) {
      logger.error(`AddressController :: updateWareHouse :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllWareHouses: RequestHandler = async (req, res, next) => {
    const userDetails = (req as ICustomRequest)?.user;
    const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;
    try {
      const wareHouseFound = await WareHouses.find({ businessId: userDetails?.shopId }).limit(+pageSize).skip(+page);
      return res.status(HTTP_STATUS.OK).json(handleResponse('WaresHouses Found', wareHouseFound));
    } catch (err) {
      logger.error(`AddressController :: getAllWareHouses :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getWareHouse: RequestHandler = async (req, res, next) => {
    const userDetails = (req as ICustomRequest)?.user;
    try {
      const businessDetail = await BusinessInfos.findOne({
        userId: userDetails?.id,
        isVerified: true,
      }).lean();

      if (!businessDetail) {
        throw new BadRequestError('Business Detail Not Found');
      }
      const wareHouseFound = await WareHouses.findOne({ businessId: businessDetail?._id, _id: req?.params?.id });
      if (!wareHouseFound) {
        throw new NotFoundError('Warehouse Not Found');
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('WaresHouses Found', wareHouseFound));
    } catch (err) {
      logger.error(`AddressController :: getWareHouse :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  searchLocationForPosts: RequestHandler = async (req, res, next) => {
    try {
      if (!req?.query?.search) {
        return res.status(HTTP_STATUS.OK).json(handleResponse('Location Found', []));
      }
      const data = await apiService.searchLocation(req?.query?.search as string);
      const response = data?.map((data: any) => ({
        name: data?.name,
        fullAddress: data?.formatted_address,
        lat: data?.geometry?.location?.lat,
        lng: data?.geometry?.location?.lng,
      }));
      return res.status(HTTP_STATUS.OK).json(handleResponse('WaresHouses Found', response));
    } catch (err) {
      logger.error(`AddressController :: getWareHouse :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const addressController = new AddressController();
