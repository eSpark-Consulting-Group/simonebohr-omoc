import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { Banners } from '../models';

class BannerControllers {
  createBanner: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { description, title, endDate, imageUrl, productIds, startDate, maxRedemptions } = req?.body;

      const createdBanner = await Banners.create({
        description: description || '',
        title: title || '',
        endDate: endDate,
        imageUrl: imageUrl,
        productIds,
        shopId: userDetails?.shopId,
        startDate,
        maxRedemptions,
      });

      return res.status(200).json(
        handleResponse('Banner Has been created', {
          id: createdBanner?.id,
        }),
      );
    } catch (err) {
      logger.error(`BannerControllers :: createBanner :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getBanner: RequestHandler = async (req, res, next) => {
    try {
      const bannerFound: any = await Banners.findOne({
        isActive: true,
      })
        .select('title description imageUrl')
        .populate('shopId', 'name isVerified logo')
        .populate('productIds', 'id images thumbnail');

      let response = bannerFound
        ? {
            title: bannerFound?.title ?? '',
            description: bannerFound?.description ?? '',
            imageUrl: bannerFound?.imageUrl ?? '',
            shopDetails: {
              name: bannerFound?.shopId?.name ?? '',
              logo: bannerFound?.shopId?.logo ?? '',
              isVerified: bannerFound?.shopId?.isVerified ?? false,
              rating: 4,
            },
            productDetails: bannerFound?.productIds?.map((productData: any) => ({
              id: productData?._id,
              images: productData?.images,
              thumbnail: productData?.thumbnail,
            })),
          }
        : null;
      return res.status(200).json(handleResponse('Banner Found', response));
    } catch (err) {
      logger.error(`BannerControllers :: getBanner :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const bannerController = new BannerControllers();
