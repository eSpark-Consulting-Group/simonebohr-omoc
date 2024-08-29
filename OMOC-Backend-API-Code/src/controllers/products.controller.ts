import { NextFunction, RequestHandler, Response } from 'express';
import { handleResponse, logger } from '../utils';
import { EXPLORE_TYPES, HTTP_STATUS, MODEL_NAMES, PAGINATION, PRODUCT_SORTING, PRODUCT_TYPES, WEIGHT_UNITS } from '../constants';
import { ProductFaqs, ProductVariants, WishLists } from '../models';
import { ICustomRequest, IProductFaqs, IProductVariants, IQueryObject } from '../interfaces';
import { BadRequestError, UnprocessableEntityError } from '../errors';
import { Products } from '../models/products.model';
import { commonHelper, productHelper } from '../helpers';
import { ProductWareHouses } from '../models/productWareHouse.model';
import { Types, isValidObjectId } from 'mongoose';
import { userHistoryRepo } from '../repository';

class ProductsController {
  addProducts: RequestHandler = async (req, res, next) => {
    const userDetails = (req as ICustomRequest)?.user;
    try {
      const { productInfo, faqs, productVariants, productManagement } = req?.body;
      const createProduct = await Products.create({
        ...productInfo,
        productType: productInfo?.productType || PRODUCT_TYPES.PHYSICAL,
        addedBy: userDetails?.shopId,
      });

      if (faqs?.length) {
        const faqsData = (faqs as IProductFaqs[])?.map(faq => ({
          question: faq?.question,
          answer: faq?.answer,
          shopId: userDetails?.shopId,
          productId: createProduct?.id,
        }));
        await ProductFaqs.insertMany(faqsData);
      }
      if (productVariants?.length) {
        const productVariantData = (productVariants as IProductVariants[])?.map(variant => ({
          productId: createProduct?.id,
          size: variant?.size,
          weight: variant?.weight,
          weightUnit: variant?.weightUnit ?? WEIGHT_UNITS.LBS,
          sku: variant?.sku,
          color: variant?.color,
          price: variant?.price,
        }));
        await ProductVariants.insertMany(productVariantData);
      }
      if (productManagement) {
        await ProductWareHouses.create({
          ...productManagement,
          productId: createProduct?.id,
        });
      }
      return res.status(HTTP_STATUS.CREATED).json(handleResponse('Product Created SuccessFully', createProduct, HTTP_STATUS.CREATED));
    } catch (err: unknown) {
      logger.error(`ProductsController :: addProducts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateProducts: RequestHandler = async (req, res, next) => {
    const userDetails = (req as ICustomRequest)?.user;
    try {
      const { productInfo, faqs } = req?.body;

      const productDetailsFound = await Products.findOne({
        id: req?.params?.productId,
        addedBy: userDetails?.shopId,
        isDeleted: false,
      });
      if (!productDetailsFound) {
        throw new BadRequestError('Product Details Not Found');
      }
      const updatedProductDetails = commonHelper.assignValues(productDetailsFound, productInfo);
      await updatedProductDetails.save();

      if (faqs?.length) {
        await ProductFaqs.deleteMany({ productId: productDetailsFound?.id });
        const faqsData = (faqs as IProductFaqs[])?.map(faq => ({
          question: faq?.question,
          answer: faq?.answer,
          productId: productDetailsFound?.id,
        }));
        await ProductFaqs.insertMany(faqsData);
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Product Updated SuccessFully'));
    } catch (err: unknown) {
      logger.error(`ProductsController :: updateProducts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getUserProduct: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const _id = req?.params?.id;
      if (!isValidObjectId(_id)) {
        throw new UnprocessableEntityError('Enter Valid Product Id');
      }
      const productDetailsFound = await Products.findOne({
        _id,
        // isActive: true,
        // isDeleted: false,
      })
        .populate({
          path: 'addedBy',
          select: 'name',
        })
        .lean();

      if (!productDetailsFound) {
        throw new BadRequestError('Product Details Not Found');
      }

      if (req?.query?.isSearched === 'true') {
        await userHistoryRepo.saveUserFeedHistory({
          userId: userDetails?.id as string,
          type: EXPLORE_TYPES.PRODUCTS,
          entityId: _id,
        });
      }

      const wishListsPromise = WishLists.find({ userId: userDetails?.id }).lean();

      const productVariantsPromise = ProductVariants.find({ productId: productDetailsFound?._id }).lean();

      const faqsPromise = ProductFaqs.find({ productId: productDetailsFound?._id }).lean();

      const [wishLists, productVariants, faqs] = await Promise.all([wishListsPromise, productVariantsPromise, faqsPromise]);

      const productIdsInWishList = wishLists?.reduce((acc: any, curr: any) => {
        return [...acc, ...curr?.productIds];
      }, []);

      (productDetailsFound as any).isBookMarked = productIdsInWishList?.some(id => id.equals(productDetailsFound?._id));

      return res.status(HTTP_STATUS.OK).json(handleResponse('Product Details Found SuccessFully', { ...productDetailsFound, productVariants, faqs }));
    } catch (err: unknown) {
      logger.error(`ProductsController :: getProducts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllUserProducts: RequestHandler = async (req, res, next) => {
    const userDetails = (req as ICustomRequest)?.user;
    try {
      const query = commonHelper.parseBody(req?.query);
      const { search, sortBy, rating, page, pageSize } = query;

      const searchRegex = { $regex: new RegExp(search), $options: 'i' };

      const sorting = ((PRODUCT_SORTING as any) || {})[sortBy] ?? PRODUCT_SORTING.newest;

      const productsPromise = Products.find({
        isActive: true,
        isDeleted: false,
        ...productHelper.productFilterWhere(query),
      })
        .populate({
          path: 'addedBy',
          select: 'name isVerified logo',
        })
        .sort(sorting)
        .limit(+pageSize || PAGINATION.PAGE_SIZE)
        .skip(+page || 0)
        .lean();
      const wishListsPromise = WishLists.find({ userId: userDetails?.id, isDeleted: false }).lean();

      const [products, wishLists] = await Promise.all([productsPromise, wishListsPromise]);

      const productIdsInWishList = wishLists?.reduce((acc: any, curr: any) => {
        return [...acc, ...curr?.productIds];
      }, []);

      products?.forEach((product: any) => {
        product.isBookMarked = productIdsInWishList?.some(id => id.equals(product._id));
      });

      return res.status(HTTP_STATUS.OK).json(handleResponse('Product Details Found SuccessFully', products));
    } catch (err: unknown) {
      logger.error(`ProductsController :: getAllProducts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getSellerProduct: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      if (!isValidObjectId(req?.params?.id)) {
        throw new UnprocessableEntityError('Enter Valid Product Id');
      }
      const productDetailsFound = await Products.findOne({ _id: req?.params?.id, isDeleted: false, addedBy: userDetails?.shopId }).lean();

      if (!productDetailsFound) {
        throw new BadRequestError('Product Details Not Found');
      }
      const productVariants = await ProductVariants.find({ productId: productDetailsFound?._id }).lean();

      const faqs = await ProductFaqs.find({ productId: productDetailsFound?._id }).lean();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Product Details Found SuccessFully', { ...productDetailsFound, productVariants, faqs }));
    } catch (err: unknown) {
      logger.error(`ProductsController :: getSellerProduct :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllSellerProducts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const query = req?.query as IQueryObject;

      const products = await Products.find({ isActive: true, addedBy: userDetails?.shopId, isDeleted: false })
        .limit(query?.pageSize ?? PAGINATION.PAGE_SIZE)
        .skip(query?.page ?? 0);

      if (!products) {
        throw new BadRequestError('Product Details Not Found');
      }
      const count = await Products.countDocuments({ isActive: true, addedBy: userDetails?.shopId, isDeleted: false });

      return res.status(HTTP_STATUS.OK).json(handleResponse('Product Details Found SuccessFully', { count, products }));
    } catch (err: unknown) {
      logger.error(`ProductsController :: getAllSellerProducts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteProducts = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const userDetails = req?.user;
      const productDetailsFound = await Products.findOne({ _id: req?.params?.id, isActive: true, isDeleted: false });
      if (!productDetailsFound) {
        throw new BadRequestError('Product  Not Found');
      }

      productDetailsFound.isDeleted = true;
      await productDetailsFound?.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Product  Deleted SuccessFully', productDetailsFound));
    } catch (err: unknown) {
      logger.error(`ProductsController :: deleteProducts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const productsController = new ProductsController();
