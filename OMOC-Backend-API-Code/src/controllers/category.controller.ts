import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest, IFileObject } from '../interfaces';
import { Categories, Orders, UserInfos } from '../models';
import { AlreadyExistsError, NotFoundError, UnprocessableEntityError } from '../errors';
import { thumbnailService, uploadService } from '../services';
import { CLOUD_FOLDERS, HTTP_STATUS, PAGINATION } from '../constants';
import { commonHelper } from '../helpers';
import { Products } from '../models/products.model';

class CategoryController {
  addCategory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { title, productIds } = req?.body;
      const category = await Categories.findOne({
        title,
        shopId: userDetails?.shopId,
        isActive: true,
        isDeleted: false,
      });

      if (category) {
        throw new AlreadyExistsError('Category already exists');
      }

      if (req?.file) {
        const uploadedFile: any = await uploadService.uploadFile(req?.file as unknown as IFileObject, CLOUD_FOLDERS.CATEGORIES);
        req.body.url = uploadedFile?.secure_url;

        const thumbnail: any = await thumbnailService.createThumbnail(req?.file?.buffer, req?.file?.originalname);

        const data: any = await uploadService.uploadFromBuffer(thumbnail, CLOUD_FOLDERS.CATEGORIES);
        req.body.thumbnail = data?.secure_url;
      }

      const created = await Categories.create({
        title,
        shopId: userDetails?.shopId,
        image: req?.body?.url ?? '',
        thumbnail: req?.body?.thumbnail ?? '',
        productIds,
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Category created Successfully', created));
    } catch (err) {
      logger.error(`CategoryController :: addCategory :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getCategories: RequestHandler = async (req, res, next) => {
    try {
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;
      const userDetails = (req as ICustomRequest)?.user;
      const categories = await Categories.find({
        shopId: userDetails?.shopId,
        isActive: true,
        isDeleted: false,
      })
        .limit(+pageSize)
        .skip(+page);

      const response = categories?.map(data => ({
        id: data?.id,
        title: data?.title,
        thumbnail: data?.thumbnail ?? '',
        image: data?.image ?? '',
        totalProducts: data?.productIds?.length,
      }));
      return res.status(HTTP_STATUS.OK).json(handleResponse('Categories Found', response));
    } catch (err) {
      logger.error(`CategoryController :: getCategories :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateCategory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { title, productIds } = req?.body;
      const _id = req.params?.id;

      if (!_id) {
        throw new UnprocessableEntityError('Product not found with this id');
      }

      const category = await Categories.findOne({
        _id,
        shopId: userDetails?.shopId,
        isActive: true,
        isDeleted: false,
      });

      if (!category) {
        throw new NotFoundError('Category not found');
      }

      if (req?.file) {
        const file: any = await uploadService.uploadFile(req?.file as unknown as IFileObject, CLOUD_FOLDERS.CATEGORIES);

        req.body.url = file?.secure_url;

        const thumbnail = await thumbnailService.createThumbnail(req?.file?.buffer, req?.file?.originalname);

        const thumbnailData: any = await uploadService.uploadFromBuffer(thumbnail, CLOUD_FOLDERS.CATEGORIES);

        req.body.thumbnail = thumbnailData?.secure_url;
      }

      commonHelper.assignValues(category, { title, productIds, image: req?.body?.url ?? '', thumbnail: req?.body?.thumbnail ?? '' });

      await category.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Category updated  Successfully'));
    } catch (err) {
      logger.error(`CategoryController :: updateCategory :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getCategory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const _id = req.params?.id;

      const categories = await Categories.findOne({
        shopId: userDetails?.shopId,
        isActive: true,
        _id,
      })
        .populate('productIds', 'name price images thumbnail')
        .lean();
      const response: any = { ...categories };
      for (let item of response?.productIds) {
        item.soldCount = await Orders.countDocuments({ productId: item?._id });
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse('Categories Found', categories));
    } catch (err) {
      logger.error(`CategoryController :: getCategories :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getProductsForCategory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;

      const productList = await Products.find({
        addedBy: userDetails?.shopId,
        isDeleted: false,
      })
        .select('name price images thumbnail isActive')
        .limit(+pageSize)
        .skip(+page)
        .lean();

      const response: any = [...productList];
      for (let item of response) {
        item.soldCount = await Orders.countDocuments({ productId: item?._id });
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('products found', response));
    } catch (err) {
      logger.error(`CategoryController :: getProductsForCategory :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteCategory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const categoryFound = await Categories.findOne({ _id: req.params?.id, shopId: userDetails?.shopId, isActive: true, isDeleted: false });
      if (!categoryFound) {
        throw new NotFoundError('Category not found');
      }
      categoryFound.isActive = false;
      categoryFound.isDeleted = true;
      await categoryFound?.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Category has been deleted'));
    } catch (err) {
      logger.error(`CategoryController :: deleteCategory :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllCategoriesForUser: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const categoriesCount = await Categories.countDocuments({
        isActive: true,
        isDeleted: false,
      });

      const categoryFound = await Categories.find({ isActive: true, isDeleted: false }).select(' shopId title image thumbnail');

      const userInfos = await UserInfos.findOne({ userId: userDetails?.id });
      const interests = userInfos?.interests ?? [];

      const categories = await Categories.aggregate([
        // Add a new field 'priority' which is 1 if the category ID is in user's interests, otherwise 0
        {
          $addFields: {
            priority: {
              $cond: { if: { $in: ['$_id', interests] }, then: 1, else: 0 },
            },
          },
        },
        // Sort categories by 'priority' in descending order
        { $sort: { priority: -1 } },
      ]);
      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Categories Found', {
          categories: categories,
          count: categoriesCount,
        }),
      );
    } catch (err) {
      logger.error(`CategoryController :: getAllCategoriesForUser :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const categoriesController = new CategoryController();
