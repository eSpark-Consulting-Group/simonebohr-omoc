import { IProductReviews } from '../interfaces';

export class OrderHelper {
  prepareUserOrderResponse = (orders: any[], reviews: IProductReviews[]) => {
    return orders?.map(data => {
      const reviewsFound = reviews.find(
        review => review?.orderId?.toString() === data?._id?.toString() && review?.productId?.toString() === data?.productId?._id?.toString(),
      );
      const { productId, ...rest } = data;
      delete rest?.orderId;
      const response = { ...rest, shopDetails: productId?.addedBy, productId, reviews: reviewsFound || {} };
      delete response?.productId?.addedBy;
      return response;
    });
  };
}

export const orderHelper = new OrderHelper();
