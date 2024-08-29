import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { DEFAULT_WISHLIST_NAME, HTTP_STATUS } from '../constants';
import { WishLists } from '../models';
import { AlreadyExistsError, BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors';
import { Products } from '../models/products.model';
import { cartHelper, commonHelper } from '../helpers';
import { Types, isValidObjectId } from 'mongoose';

class WishListController {
  createWishLists: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { name, productIds, isPrivate, sharedWith, isGroup } = req?.body;
      if (!name) {
        throw new UnprocessableEntityError('name is required for wishlist');
      }
      const wishListFound = await WishLists.findOne({
        name,
        userId: new Types.ObjectId(userDetails?.id),
      });
      if (wishListFound) {
        throw new AlreadyExistsError(`WishList with this name already exists : ${name}`);
      }
      const createdWishlist = await WishLists.create({
        name,
        userId: userDetails?.id,
        ...(productIds?.length && { productIds }),
        isPrivate,
        ...(sharedWith?.length && { sharedWith }),
        isGroup,
      });
      return res.status(HTTP_STATUS.OK).json(
        handleResponse('WishList has been Created', {
          id: createdWishlist?.id,
        }),
      );
    } catch (err) {
      logger.error(`WishListController :: createWishLists :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllWishList: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const getAllWishList = await WishLists.find({ userId: userDetails?.id, isDeleted: false })
        .populate({
          path: 'productIds',
          select: 'images',
        })
        .lean();

      const wishListResponse = getAllWishList?.map(data => {
        const productImg = ((data?.productIds[0] as any) ?? {})?.images ?? [];

        return {
          id: data?._id,
          name: data?.name,
          count: data?.productIds?.length ?? 0,
          thumbnail: productImg[0]?.url ?? '',
          isGroup: !!data?.isGroup,
          isPrivate: !!data?.isPrivate,
          // productIds: data?.productIds,
          // sharedWith: data?.sharedWith,
        };
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Data Found', wishListResponse));
    } catch (err) {
      logger.error(`WishListController :: getAllWishList :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  addProductToWishList: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { productIds, wishListId } = req?.body;
      const foundWishList = await WishLists.findOne({ _id: wishListId, userId: userDetails?.id, isDeleted: false });
      if (!foundWishList) {
        throw new NotFoundError('WishList not found');
      }
      const productObjectIds = productIds?.map((id: string) => new Types.ObjectId(id));

      const productsFound = await Products.find({
        _id: productObjectIds,
        isActive: true,
        isDeleted: false,
      }).select('id');

      if (productsFound?.length != productObjectIds?.length) {
        throw new BadRequestError('Please check All Product Ids');
      }
      const uniqueProductIds = [...foundWishList?.productIds, ...productObjectIds];

      foundWishList.productIds = uniqueProductIds;
      await foundWishList.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Product has been added to wishlist'));
    } catch (err) {
      logger.error(`WishListController :: addProductToWishList :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  removeProductToWishList: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { productIds, wishListId } = req?.body;

      const foundWishList = await WishLists.findOne({ _id: wishListId, userId: userDetails?.id, isDeleted: false });

      if (!foundWishList) {
        throw new NotFoundError('WishList not found');
      }

      const productObjectIds = productIds?.map((id: string) => id);

      const newProductList = foundWishList?.productIds?.filter(id => {
        return !productObjectIds?.includes(id?.toString());
      });

      foundWishList.productIds = newProductList;
      await foundWishList.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Products has been removed from wishlist'));
    } catch (err) {
      logger.error(`WishListController :: removeProductToWishList :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getWishListProducts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const wishListId = req?.params?.wishListId;

      if (!isValidObjectId(wishListId)) {
        throw new UnprocessableEntityError('Invalid WishList Id');
      }

      const wishListFound = await WishLists.findOne({ _id: wishListId, isDeleted: false, userId: userDetails?.id });

      if (!wishListFound) {
        throw new NotFoundError('WishList not found');
      }
      const products = await Products.find({
        _id: {
          $in: wishListFound?.productIds,
        },
      });

      return res.status(HTTP_STATUS.OK).json(handleResponse('products Found', products));
    } catch (err) {
      logger.error(`WishListController :: getWishListProducts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const wishListController = new WishListController();
