import { PRODUCT_SORTING } from '../constants';
import { IProductReviews } from '../interfaces';

class ProductHelper {
  /**
   *
   * @param query parsed object
   * @returns filters for product
   */
  productFilterWhere = (query: any) => {
    const { search, minPrice, maxPrice, categoryId, productType } = query;

    const searchRegex = { $regex: new RegExp(search), $options: 'i' };
    return {
      ...(categoryId && { category: categoryId }),
      ...(productType && { productType: productType }),
      ...(search && {
        $or: [
          { name: searchRegex },
          { brand: searchRegex },
          { toolTip: searchRegex },
          {
            type: searchRegex,
          },
          {
            genders: searchRegex,
          },
        ],
      }),
      ...((minPrice || maxPrice) && { price: { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) } }),
    };
  };
}

export const productHelper = new ProductHelper();
