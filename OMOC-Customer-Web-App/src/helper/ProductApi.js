import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

class ProductSublyApi {
  static async request(endpoint, data = {}, method = "get", header) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = { ...header };
    try {
      const result = await axios({ url, method, data, headers });
      return result ? result.data : "There is no return for this route";
    } catch (err) {
      return err.response;
    }
  }

  /* ------PRODUCT LIST API -----*/

  static async fetchProductList(token) {
    let header = { Authorization: `Bearer ${token}` };

    let res = await this.request(`products`, undefined, "get", header);
    return res;
  }

  /* ------PRODUCT DETAILS API -----*/

  static async fetchProductDetail(id, token) {
    let header = { Authorization: `Bearer ${token}` };

    let res = await this.request(`products/${id}`, undefined, "get", header);
    return res;
  }

  /* ------ADD TO CART API -----*/

  static async addToCart(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`cart`, data, "post", header);
    return res;
  }

  /* ------CART LIST API -----*/

  static async fetchCartList(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`cart`, undefined, "get", header);
    return res;
  }

  /* ------ADDRESS LIST API -----*/

  static async fetchAddressList(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`address`, undefined, "get", header);
    return res;
  }

  /* ------ADD NEW ADDRESS API -----*/

  static async addNewAddress(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`address`, data, "post", header);
    return res;
  }
  /* ------UPDATE ADDRESS API -----*/

  static async upDateAddress(data, token, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`address/${id}`, data, "put", header);
    return res;
  }

  /* ------UPDATE ADDRESS API -----*/

  static async deleteAddress(token, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`address/${id}`, undefined, "delete", header);
    return res;
  }

  /* ------PLACE ORDER API -----*/

  static async placeOrder(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`orders`, data, "post", header);
    return res;
  }

  /* ------GIVE RATING API -----*/

  static async fetchRatingOrder(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `rating?reviewGiven=${false}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------RATING API -----*/

  static async fetchRating(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `rating?reviewGiven=${true}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------GIVE RATING API -----*/

  static async giveRating(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`rating`, data, "post", header);
    return res;
  }

  /* ------PRODUCT IMAGE API -----*/

  static async productImage(data, token) {
    let header = { Authorization: `Bearer ${token}` };

    let res = await this.request(`assets`, data, "post", header);
    return res;
  }

  /* ------DELETE IMAGE API -----*/

  static async deleteImage(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`assets?id=${data}`, data, "delete", header);
    return res;
  }

  /* ------SHOP DETAILS API -----*/
  static async shopDetail(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`address`, undefined, "get", header);
    return res;
  }
  /* ------CATEGORY DETAILS API -----*/
  static async categoryDetails(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`user/interests`, undefined, "get", header);
    return res;
  }
  /* ------SHOP PRODUCT DETAILS API -----*/
  static async shopProductDetails(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`banner`, undefined, "get", header);
    return res;
  }
  /* ------PRODUCT QUANTITY INCREMENT DECEREMENT API -----*/
  static async quantityIncandDec(token, data) {
    let header = { Authorization: `Bearer ${token}` };

    let res = await this.request(`cart`, data, "put", header);
    return res;
  }

  /* ------WISH LIST CATEGORIES API -----*/

  static async fetchWishCategory(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`wishlist`, undefined, "get", header);
    return res;
  }

  /* ------WISH LIST CATEGORIES API -----*/

  static async fetchWishList(token, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `wishlist/products/${id}`,

      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------SHOP PRODUCT DETAILS API -----*/
  static async shopProductDetails(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`banner`, undefined, "get", header);
    return res;
  }

  /* ------ADD WISH LIST CATEGORIES API -----*/

  static async addWishCategory(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`wishlist`, data, "post", header);
    return res;
  }

  /* ------ADD TO WISH LIST API -----*/

  static async addWishList(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`wishlist/add-product`, data, "post", header);
    return res;
  }

  /* ------DELETE PRODUCT  -----*/
  static async deleteProduct(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`cart/remove`, data, "post", header);
    return res;
  }

  /* ------  SEARCH   -----*/

  static async serachFeed(token, text) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `user/search-feed?text=${text}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------  GET VOUCHER   -----*/
  static async fetchVoucher(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`user/get-vouchers`, data, "post", header);
    return res;
  }
}

export default ProductSublyApi;
