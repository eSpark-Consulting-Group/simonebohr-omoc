import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { FAQ_TYPES, HTTP_STATUS, MODEL_NAMES, PAGINATION } from '../constants';
import { ProductFaqs } from '../models';
import { Products } from '../models';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import { isValidObjectId } from 'mongoose';

class FAQController {
  createFAQ: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { productId, type, question, answer, variantId } = req?.body;
      if (productId) {
        const productFound = await Products.findOne({
          _id: productId,
          addedBy: userDetails?.shopId,
        });
        if (!productFound) {
          throw new NotFoundError('Product not found with this id');
        }
      }
      await ProductFaqs.create({
        productId,
        question,
        answer,
        type,
        variantId,
        shopId: userDetails?.shopId,
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Faq Saved'));
    } catch (err) {
      logger.error(`FAQController :: createFAQ :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getGeneralFAQ: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;

      const where = { type: FAQ_TYPES.GENERAL, shopId: userDetails?.shopId };

      const faqsPromise = ProductFaqs.find(where).limit(+pageSize).skip(+page);

      const faqCountPromise = ProductFaqs.countDocuments(where);

      const [faqs, count] = await Promise.all([faqsPromise, faqCountPromise]);

      return res.status(HTTP_STATUS.OK).json(handleResponse('Faq Found', { faqs, count }));
    } catch (err) {
      logger.error(`FAQController :: getGeneralFAQ :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getProductsFaq: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const { pageSize = PAGINATION.PAGE_SIZE, page = 0, search } = req?.query;

      const where = {
        type: FAQ_TYPES.PRODUCT,
        shopId: userDetails?.shopId,
        ...(search && {
          'products.0.name': {
            $regex: '.*' + search + '.*',
          },
        }),
      };

      const faqsPromise = ProductFaqs.aggregate([
        {
          $addFields: {
            productIdObject: { $toObjectId: '$productId' },
          },
        },
        {
          $lookup: {
            from: MODEL_NAMES.PRODUCTS,
            localField: 'productIdObject',
            foreignField: '_id',
            as: 'products',
          },
        },
        {
          $match: {
            ...where,
          },
        },
        {
          $project: {
            productIdObject: 0,
          },
        },
        {
          $limit: +pageSize,
        },
        { $skip: +page },
      ]);
      const faqCountPromise = ProductFaqs.countDocuments(where);

      const [faqs, count] = await Promise.all([faqsPromise, faqCountPromise]);

      const faqProducts: any = [];
      faqs?.forEach(faqData => {
        if (faqData?.products?.length) {
          faqProducts.push(faqData?.products[0]);
        }
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Faq Found', { faqProducts, count }));
    } catch (err) {
      logger.error(`FAQController :: getProductsFaq :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getFaqByProductId: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const productId = req?.params?.productId;

      if (!isValidObjectId(productId)) {
        throw new UnprocessableEntityError('Enter Valid productId');
      }

      const where = {
        type: FAQ_TYPES.PRODUCT,
        shopId: userDetails?.shopId,
        productId,
      };
      const faqs = await ProductFaqs.find(where);

      return res.status(HTTP_STATUS.OK).json(handleResponse('Success', faqs));
    } catch (err) {
      logger.error(`FAQController :: getFaqByProductId :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const faqController = new FAQController();
