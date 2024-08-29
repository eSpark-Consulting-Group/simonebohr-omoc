class CartHelper {
  prepareCartListResponse = (response: any, cartList: any) => {
    response.totalQuantity = 0;
    response.originalPrice = 0;
    response.totalPrice = 0;
    response.discountPrice = 0;
    response.cartProducts = [];

    cartList.forEach((item: any) => {
      response.totalQuantity += item?.quantity;
      response.originalPrice += (item?.productId as any)?.originalPrice * item?.quantity;
      response.totalPrice += (item?.productId as any)?.price * item?.quantity;
      response.discountPrice = response.originalPrice - response.totalPrice;

      const shopExists = response.cartProducts.find((data: any) => data.shopId === (item?.productId as any)?.addedBy?._id);
      if (shopExists) {
        shopExists.data?.push({
          _id: item?.productId?._id,
          name: item?.productId?.name ?? '',
          images: item?.productId?.images ?? [],
          price: item?.productId?.price ?? 0,
          originalPrice: item?.productId?.originalPrice ?? 0,
          quantity: item?.quantity ?? 0,
        });
      } else {
        response.cartProducts.push({
          shopId: item?.productId?.addedBy?._id,
          shopName: item?.productId?.addedBy?.name,
          shopImage: '',
          data: [
            {
              _id: item?.productId?._id,
              name: item?.productId?.name ?? '',
              images: item?.productId?.images ?? [],
              price: item?.productId?.price ?? 0,
              originalPrice: item?.productId?.originalPrice ?? 0,
              category: item?.productId?.category || '',
              description: item?.productId?.description || '',
              recommendedCategories: item?.productId?.recommendedCategories || '',
              quantity: item?.quantity ?? 0,
              brand: item?.productId?.brand ?? '',
              type: item?.productId?.type ?? '',
            },
          ],
        });
      }
      item.productId.addedBy = item?.productId?.addedBy?._id;
    });
  };
}

export const cartHelper = new CartHelper();
