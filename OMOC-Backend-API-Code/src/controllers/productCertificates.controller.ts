import { RequestHandler } from 'express';
import { HTTP_STATUS, MODEL_NAMES, PRODUCT_CERTIFICATES_STATUS } from '../constants';
import { calculateIsNext, getValuesFromArray, handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { ProductCertificates, Products } from '../models';
import { BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors';
import { Types, isValidObjectId } from 'mongoose';

// Shipping controller
class ProductCertificatesController {
  createCertificateRequest: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { productIds } = req?.body;
      const objectIds = productIds?.reduce(
        (acc: any, curr: any) => {
          if (isValidObjectId(curr.id)) acc.productIds = [...acc.productIds, new Types.ObjectId(curr.id)];
          if (isValidObjectId(curr.variantId)) acc.variantIds = [...acc.variantIds, new Types.ObjectId(curr.variantId)];
          return acc;
        },
        {
          productIds: [],
          variantIds: [],
        },
      );
      const products = await Products.find({
        _id: {
          $in: objectIds?.productIds,
        },
        addedBy: new Types.ObjectId(userDetails?.shopId),
      });
      if (products?.length !== productIds?.length) {
        throw new NotFoundError('Please check product Ids');
      }

      const alreadyPresentProducts = await ProductCertificates.findOne({
        productId: {
          $in: objectIds?.productIds,
        },
        shopId: new Types.ObjectId(userDetails?.shopId),
      });
      if (alreadyPresentProducts) {
        throw new BadRequestError('Some Products are already requested for certificates');
      }

      const productCertificatesData = productIds?.map((product: { id: string; variantId: string }) => ({
        productId: product?.id,
        variantId: product?.variantId,
        shopId: userDetails?.shopId,
        submittedBy: userDetails?.id,
      }));
      await ProductCertificates.insertMany(productCertificatesData);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Request has been created successfully'));
    } catch (err) {
      logger.error(`ProductCertificatesController :: createCertificateRequest :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getCertificateList: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { page, pageSize, search } = req?.query;

      const where: any = {
        shopId: userDetails?.shopId,
      };
      const limit = +(pageSize || 0);
      const skip = +(page || 0);
      if (search) {
        const products = await Products.find({
          name: {
            $regex: '.*' + search + '.*',
            $options: 'i',
          },
          addedBy: userDetails?.shopId,
        }).select('_id');

        where['productId'] = {
          $in: getValuesFromArray(products, 'id'),
        };
      }
      const certificateRequestsPromise = await ProductCertificates.aggregate([
        {
          $match: where,
        },
        {
          $addFields: {
            productId: { $toObjectId: '$productId' },
          },
        },
        {
          $lookup: {
            from: MODEL_NAMES.PRODUCTS,
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: '$product',
        },
      ]);
      const countPromise = await ProductCertificates.countDocuments(where);

      const [count, certificateRequests] = await Promise.all([countPromise, certificateRequestsPromise]);

      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Certificate Request found successfully', {
          count,
          certificateRequests,
          isNext: calculateIsNext(count, skip, limit),
        }),
      );
    } catch (err) {
      logger.error(`ProductCertificatesController :: getCertificateList :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateCertificateRequest: RequestHandler = async (req, res, next) => {
    try {
      const { certificateId, isAccepted } = req?.body;

      if (!isValidObjectId(certificateId)) {
        throw new UnprocessableEntityError('Please Enter Valid Id');
      }

      const certificateFound = await ProductCertificates.findOne({
        _id: new Types.ObjectId(certificateId),
      });

      if (!certificateFound) {
        throw new NotFoundError('Certificate Not Found');
      }
      certificateFound.status = !!isAccepted ? PRODUCT_CERTIFICATES_STATUS.ACCEPTED : PRODUCT_CERTIFICATES_STATUS.REJECTED;
      await certificateFound.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Certificate Request updated successfully'));
    } catch (err) {
      logger.error(`ProductCertificatesController :: updateCertificateRequest :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  // Get Products List for Certificates those are not requested
  getCertificateProductsList: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { page, pageSize, search } = req?.query as any;

      const limit = +(pageSize || 0);
      const skip = +(page || 0);

      const alreadyAppliedProducts = await ProductCertificates.find({
        shopId: userDetails?.shopId,
        isActive: true,
      });

      const productIds = alreadyAppliedProducts?.map((product: any) => new Types.ObjectId(product?.productId));

      const where = {
        isActive: true,
        isDeleted: false,
        addedBy: new Types.ObjectId(userDetails?.shopId),
        _id: {
          $nin: productIds,
        },
        ...(search && {
          name: {
            $regex: '.*' + search + '.*',
            $options: 'i',
          },
        }),
      };

      const countPromise = Products.countDocuments(where);
      const productsPromise = Products.find(where).limit(limit).skip(skip).lean();
      const [count, products] = await Promise.all([countPromise, productsPromise]);

      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Products found successfully', {
          count,
          products,
          isNext: calculateIsNext(count, skip, limit),
        }),
      );
    } catch (err) {
      logger.error(`ProductCertificatesController :: getCertificateProductsList :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const productCertificatesController = new ProductCertificatesController();
