class WishListHelper {
  prepareWishListResponse = (wishLists: any[]) => {
    return wishLists?.map(data => {
      const productImg = ((data?.productIds[0] as any) ?? {})?.images ?? [];
      return {
        id: data?._id,
        name: data?.name,
        count: data?.productIds?.length ?? 0,
        thumbnail: productImg[0]?.url ?? '',
      };
    });
  };
}

export const wishListHelper = new WishListHelper();
