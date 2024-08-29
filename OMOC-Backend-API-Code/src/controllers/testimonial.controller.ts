import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { COMMON_STATUS, EntityTypes, HTTP_STATUS, MODEL_NAMES, PAGINATION, RESPONSE_TYPES } from '../constants';
import { ICustomRequest } from '../interfaces';
import { Comments, ProductReviews, TestimonialResponse } from '../models';
import { Types } from 'mongoose';
import { NotFoundError } from '../errors';

class TestimonialController {
  getTestimonials: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0, status } = req?.query;
      const totalCount: any = await ProductReviews.aggregate([
        {
          $lookup: {
            from: MODEL_NAMES.PRODUCTS,
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $match: {
            'product.addedBy': new Types.ObjectId(userDetails?.shopId),
            ...(status && { status: status }),
          },
        },
        {
          $count: 'total', 
        },
      ]);

      const reviewsFound = (await ProductReviews.aggregate([
        {
          $lookup: {
            from: MODEL_NAMES.PRODUCTS,
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $lookup: {
            from: MODEL_NAMES.USERS,
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $match: {
            'product.addedBy': new Types.ObjectId(userDetails?.shopId),
            ...(status && { status }),
          },
        },
        // -------------------comments
        {
          $lookup: {
            from: MODEL_NAMES.COMMENTS,
            let: { reviewId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: [{ $toObjectId: '$entityId' }, '$$reviewId'] },
                  entityType: EntityTypes.TESTIMONIAL_RESPONSE,
                },
              },
              {
                $replaceRoot: { newRoot: '$$ROOT' }, // Flatten the documents
              },
            ],
            as: 'responses',
          },
        },
        { $limit: +pageSize },
        { $skip: +page },
      ])) as any;

      const count = (totalCount ?? [])[0]?.total || 0;

      const reviews = reviewsFound?.map((data: any) => {
        const userDetails = (data?.userDetails ?? {})[0];
        const product = (data?.product ?? {})[0];
        return {
          productDetails: {
            productName: product?.name,
            productId: product?._id,
            thumbnail: product?.thumbnail ?? null,
            images: product?.images ?? null,
          },
          ratingId: data?._id,
          rating: data?.rating,
          comment: data?.comment,
          status: data?.status,
          orderId: data?.orderId,
          files: data?.files || null,
          userDetails: {
            name: userDetails.name,
            id: userDetails._id,
            profile: userDetails?.profileImg,
          },
          responses: data?.responses?.map((data: any) => ({
            id: data?._id,
            comment: data?.comment,
            entityId: data?.entityId,
            createdAt: data?.createdAt,
          })),
          commentDate: data?.createdAt,
        };
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Testimonials Found', { count, reviews }));
    } catch (err) {
      logger.error(`TestimonialController :: getTestimonials :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  responseTestimonial: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { reviewId, response } = req?.body;

      const productReviewFound: any = await ProductReviews.findOne({
        _id: reviewId,
        isActive: true,
      }).populate({
        path: 'productId',
        select: 'id addedBy',
      });

      if (!productReviewFound || productReviewFound?.productId?.addedBy?.toString() != userDetails?.shopId) {
        throw new NotFoundError('Review Not Found');
      }

      await Comments.create({
        userId: userDetails?.id,
        comment: response,
        entityId: reviewId,
        entityType: EntityTypes.TESTIMONIAL_RESPONSE,
      });

      productReviewFound.status = COMMON_STATUS.APPROVED;
      await productReviewFound?.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Response Given Successfully', { productReviewFound }));
    } catch (err) {
      logger.error(`TestimonialController :: responseTestimonial :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  reportTestimonial: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { reviewId, response } = req?.body;

      const productReviewFound: any = await ProductReviews.findOne({
        _id: reviewId,
        isActive: true,
      }).populate({
        path: 'productId',
        select: 'id addedBy',
      });

      if (!productReviewFound || productReviewFound?.productId?.addedBy?.toString() != userDetails?.shopId) {
        throw new NotFoundError('Review Not Found');
      }

      await Comments.create({
        userId: userDetails?.id,
        comment: response,
        entityId: reviewId,
        entityType: EntityTypes.TESTIMONIAL_RESPONSE,
      });

      productReviewFound.status = COMMON_STATUS.REJECTED;
      await productReviewFound?.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Reported Successfully', { productReviewFound }));
    } catch (err) {
      logger.error(`TestimonialController :: reportTestimonial :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}
export const testimonialController = new TestimonialController();
