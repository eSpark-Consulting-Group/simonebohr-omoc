import { IProductReviews, IProducts } from '../interfaces';

class RatingHelper {
  prepareNotGivenRatingResponse = (orders: any) => {
    const response: any = [];
    return orders?.map((order: any) => {
      const { productId, ...orderDetails } = order;
      return {
        productId: productId._id,
        productName: productId.name,
        images: productId?.images,
        thumbnail: productId?.thumbnail,
        price: orderDetails?.amount / orderDetails?.quantity,
        orderedOn: orderDetails?.createdAt,
        orderId: orderDetails?._id,
      };
    });
  };

  prepareGivenUserRatingsResponse = (reviews: any[]) => {
    return reviews?.map(item => {
      const { productId, orderId, ...review } = item;
      return {
        productId: productId?._id,
        productName: productId?.name || '',
        images: productId?.images,
        price: productId?.price,
        orderedOn: orderId?.createdAt,
        review,
      };
    });
  };
}

export const ratingHelper = new RatingHelper();
