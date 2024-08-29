export const AddWishlist = (payload: any) => {
    // console.log('action', payload);
    return {
      type: 'ADD_WISHLIST',
      payload: payload,
    };
  };