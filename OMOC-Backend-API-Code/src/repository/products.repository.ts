import { Types } from 'mongoose';
import { MODEL_NAMES } from '../constants';
import { Products } from '../models/products.model';

class ProductsRepository {
  getUserProducts = (userId: any) => {
    return Products.aggregate([
      {
        $match: {
          isActive: true,
          isDeleted: false,
        },
      },
      //   Products

      {
        $lookup: {
          from: MODEL_NAMES.BUSINESS_INFO, // The name of the collection where BusinessInfos are stored
          localField: 'addedBy', // The field in Products model to match with _id in BusinessInfos model
          foreignField: '_id', // The field in BusinessInfos model to match with localField
          as: 'addedByInfo', // The alias for the joined documents
        },
      },
      {
        $unwind: '$addedByInfo', // Unwind the array created by $lookup stage
      },
      //   Wishlist
      //   {
      //     $lookup: {
      //       from: MODEL_NAMES.WISH_LISTS,
      //       let: { productId: '$_id' },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $and: [
      //                 { $eq: ['$userId', new Types.ObjectId(userId)] }, // Match wishlists of the specific user
      //                 { $in: ['$$productId', '$productIds'] },
      //               ],
      //             },
      //           },
      //         },
      //       ],
      //       as: 'wishlistProducts',
      //     },
      //   },
      //   // Project stage to add a flag indicating if the product is in the wishlist
      //   {
      //     $addFields: {
      //       isInWishlist: {
      //         $cond: { if: { $gt: [{ $size: '$wishlistProducts' }, 0] }, then: true, else: false },
      //       },
      //     },
      //   },
    ]);
  };
}

export const productRepo = new ProductsRepository();
