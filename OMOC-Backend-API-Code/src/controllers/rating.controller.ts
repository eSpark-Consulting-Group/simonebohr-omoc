import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest, IOrders, IProducts } from '../interfaces';
import { OrderSummary, Orders, ProductReviews } from '../models';
import { HTTP_STATUS } from '../constants';
import { commonHelper, orderHelper, ratingHelper, userHelper } from '../helpers';
import { NotFoundError } from '../errors';

class RatingController {
  constructor() {}
  getUserRatings: RequestHandler = async (req, res, next) => {
    try {
      const { page, pageSize } = req?.query as any;
      const userDetails = (req as ICustomRequest)?.user;
      const reviewGiven = req?.query?.reviewGiven === 'true';

      const orderSummary = await OrderSummary.find({
        userId: userDetails?.id,
      })
        .select('_id')
        .lean();

      const orderFounds = await Orders?.find({
        orderId: {
          $in: orderSummary?.map(order => order?._id),
        },
      }).select('id');

      const orderIds = orderFounds?.map(order => order?._id);
      const reviews = await ProductReviews.find({
        orderId: {
          $in: orderIds,
        },
      })
        .populate('orderId')
        .populate('productId')
        .limit(+pageSize)
        .skip(+page)
        .sort({ createdAt: -1 })
        .lean();

      if (reviewGiven) {
        const response = ratingHelper.prepareGivenUserRatingsResponse(reviews);
        return res.status(HTTP_STATUS.OK).json(handleResponse('Reviews Found', response));
      } else {
        const orderIdsNotReviews = reviews?.map((review: any) => review?.orderId?._id);
        const ordersWithoutReviews = await Orders.find({
          $and: [
            {
              _id: { $in: orderIds },
            },
            { _id: { $nin: orderIdsNotReviews } },
          ],
        })
          .populate('productId')
          .limit(+pageSize)
          .skip(+page)
          .sort({ createdAt: -1 })
          .lean();
        const response = ratingHelper.prepareNotGivenRatingResponse(ordersWithoutReviews);
        return res.status(HTTP_STATUS.OK).json(handleResponse('Reviews Found', response));
      }
    } catch (err) {
      logger.error(`UserController :: getUserProfile :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  giveProductRating: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { orderId, rating, comment, files, variantId } = req?.body;
      const orderFound = await Orders.findOne({ _id: orderId }).populate({
        path: 'orderId',
        match: {
          userId: userDetails?.id,
        },
      });

      if (!orderFound) {
        throw new NotFoundError('Order not found');
      }
      const ratingFound = await ProductReviews.findOne({
        orderId,
        userId: userDetails?.id,
        ...(variantId && { variantId }),
      });
      if (ratingFound) {
        commonHelper.assignValues(ratingFound, { rating, comment, files });
        await ratingFound.save();
      } else {
        const reviewId = await ProductReviews.create({
          orderId,
          productId: orderFound?.productId,
          userId: userDetails?.id,
          variantId,
          rating,
          comment,
          files,
        });
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse('Rating Added Successfully'));
    } catch (err) {
      logger.error(`UserController :: giveProductRating :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const ratingController = new RatingController();
