import { RequestHandler } from 'express';
import { generateOTP, getTime, handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { BusinessInfos, BusinessLocations, BusinessVerifications, SellerInfos, Sellers } from '../models';
import { EXPLORE_TYPES, HTTP_STATUS, MODEL_NAMES } from '../constants';
import { AlreadyExistsError, BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors';
import { Types, isValidObjectId } from 'mongoose';
import { commonHelper } from '../helpers';
import { userHistoryRepo } from '../repository';

export class BusinessController {
  saveBusinessInfos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { isAlreadySelling, businessName, country, email, category } = req?.body;
      const sellerInfo = await SellerInfos.findOne({ userId: userDetails?.id });

      if (sellerInfo) {
        sellerInfo.isAlreadySelling = isAlreadySelling;
        await sellerInfo.save();
      } else {
        await SellerInfos.create({
          userId: userDetails?.id,
          isAlreadySelling,
        });
      }

      const checkBusinessExists = await BusinessInfos.findOne({ email, userId: userDetails?.id });

      if (checkBusinessExists && checkBusinessExists?.isVerified) {
        throw new AlreadyExistsError('Shop already Exists');
      }

      const businessData = await BusinessInfos.create({
        name: businessName,
        categories: category,
        country,
        userId: userDetails?.id,
        email,
        isAlreadySelling,
      });

      await BusinessVerifications.create({
        businessId: businessData?.id,
        otp: generateOTP(),
        otpExpTime: getTime(),
      });

      return res.status(HTTP_STATUS.OK).json(handleResponse('Business Info saved successfully and Otp Sent', businessData));
    } catch (err) {
      logger.error(`BusinessController :: businessInfos :: ${(err as Error)?.message}`);
      next(err);
    }
  };

  getAllBusinessInfos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const businessFound = await BusinessInfos.find({
        userId: userDetails?.id,
        isVerified: true,
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Business Info found successfully', businessFound));
    } catch (err) {
      logger.error(`BusinessController :: getAllBusinessInfos :: ${(err as Error)?.message}`);
      next(err);
    }
  };

  verifyBusiness: RequestHandler = async (req, res, next) => {
    try {
      const { email, otp } = req?.body;
      const userDetails = (req as ICustomRequest)?.user;
      const businessFound = await BusinessInfos.findOne({
        email,
        userId: userDetails?.id,
      });
      if (!businessFound) {
        throw new NotFoundError('Business not found');
      }
      if (businessFound?.isVerified) {
        throw new BadRequestError('Already Verified');
      }
      const businessVerification = await BusinessVerifications.findOne({
        businessId: businessFound?.id,
      });
      if (!businessVerification) {
        throw new BadRequestError('Otp Not Found');
      }
      // if ((businessVerification?.otpExpTime as Date) < new Date()) {
      //   throw new BadRequestError('OTP Expired');
      // }
      if (+(businessVerification?.otp ?? 0) !== +otp) {
        throw new BadRequestError('Invalid OTP');
      }
      businessFound.isVerified = true;
      await businessFound.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('verify Otp successfully', businessFound));
    } catch (err) {
      logger.error(`BusinessController :: verifyBusiness :: ${(err as Error)?.message}`);
      next(err);
    }
  };

  addBusinessLocation: RequestHandler = async (req, res, next) => {
    const userDetails = (req as ICustomRequest)?.user;
    try {
      const { name, address, region, city, zipCode, country, lat, long } = req?.body;

      const businessFound = await BusinessLocations.findOne({ businessId: userDetails?.shopId });

      const createdBusiness = await BusinessLocations.create({
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
      return res.status(HTTP_STATUS.OK).json(handleResponse('Business Location Created SuccessFully', createdBusiness, HTTP_STATUS.OK));
    } catch (err) {
      logger.error(`BusinessController :: addBusinessLocation :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  editBusinessLocation: RequestHandler = async (req, res, next) => {
    const userDetails = (req as ICustomRequest)?.user;
    try {
      const { name, address, region, city, zipCode, country, lat, long, locationId } = req?.body;
      if (!isValidObjectId(locationId)) {
        throw new UnprocessableEntityError('Invalid Location Id');
      }
      const locationFound = await BusinessLocations.findOne({
        _id: locationId,
        businessId: userDetails?.shopId,
      });

      if (!locationFound) {
        throw new NotFoundError('Location Not Found');
      }

      commonHelper.assignValues(locationFound, { name, address, region, city, zipCode, country, lat, long });
      await locationFound?.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Location has been updated'));
    } catch (err) {
      logger.error(`BusinessController :: editBusinessLocation :: ${(err as Error)?.message}`);
      next(err);
    }
  };

  getBusinessBasicInfo: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const businessPromise = BusinessInfos.findOne({ _id: userDetails?.shopId }).lean();

      const sellerPromise = Sellers.findOne({
        _id: userDetails?.id,
      }).lean();

      const businessLocations = BusinessLocations.find({ businessId: userDetails?.shopId }).lean();

      const [businessFound, sellerDetails, locations] = await Promise.all([businessPromise, sellerPromise, businessLocations]);
      if (!businessFound) {
        throw new AlreadyExistsError('Business Info not found');
      }

      const response = { businessDetails: businessFound, locations, sellerDetails };
      return res.status(HTTP_STATUS.OK).json(handleResponse('Business Info found successfully', response));
    } catch (err) {
      logger.error(`BusinessController :: getBusinessBasicInfo :: ${(err as Error)?.message}`);
      next(err);
    }
  };

  editBasicBusinessInfo: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { name, companyName, ownerName, taxId, phone, email } = req?.body;

      if (name || taxId || email || companyName) {
        const updateBody = commonHelper.assignValues(
          {},
          {
            name,
            taxId,
            email,
            companyName,
          },
        );
        await BusinessInfos.updateOne({ _id: userDetails?.shopId }, updateBody);
      }
      if (ownerName || phone) {
        const updateBody = commonHelper.assignValues(
          {},
          {
            name: ownerName,
            phone,
          },
        );
        await Sellers.findOneAndUpdate({ _id: userDetails?.id }, updateBody);
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Data has been updated successfully'));
    } catch (err) {
      logger.error(`BusinessController :: editBasicBusinessInfo :: ${(err as Error)?.message}`);
      next(err);
    }
  };

  getBusinessBasicInfoById: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const shopId = req?.params?.shopId;

      if (!isValidObjectId(shopId)) {
        throw new UnprocessableEntityError('Invalid Shop Id');
      }

      const businessFound = await BusinessInfos.findOne({ _id: new Types.ObjectId(shopId) }).lean();

      if (!businessFound) {
        throw new NotFoundError('Detail Not Found');
      }

      if (req?.query?.isSearched === 'true') {
        await userHistoryRepo.saveUserFeedHistory({
          userId: userDetails?.id as string,
          type: EXPLORE_TYPES.SHOP,
          entityId: businessFound?._id,
        });
      }
      const response = { businessDetails: businessFound };
      return res.status(HTTP_STATUS.OK).json(handleResponse('Business Info found successfully', response));
    } catch (err) {
      logger.error(`BusinessController :: getBusinessBasicInfoById :: ${(err as Error)?.message}`);
      next(err);
    }
  };
}
export const businessController = new BusinessController();
