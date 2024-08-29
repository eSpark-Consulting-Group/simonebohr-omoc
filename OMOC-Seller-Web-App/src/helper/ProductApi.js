import axios from "axios";

// const BASE_URL = "http://16.171.237.241:4000/v1/";
const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://f744-122-175-155-10.ngrok-free.app/v1/";

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

  /* ------CREATE PRODUCT API -----*/

  static async createProduct(data, token, shopId) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `products?shopId=${shopId}`,
      data,
      "post",
      header
    );
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

  /* ------PRODUCT LIST API -----*/

  static async fetchProductList(shopId, page, pageSize, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `products/seller?shopId=${shopId}&page=${page}&pageSize=${pageSize}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------DELETE PRODUCT API -----*/

  static async deleteProduct(id, shopId, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `products/${id}?shopId=${shopId}`,
      undefined,
      "delete",
      header
    );
    return res;
  }

  /* ------ORDER LIST API -----*/

  static async fetchOrderList(shopId, status, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `dashboard/orders?shopId=${shopId}&status=${status}`,
      undefined,
      "get",
      header
    );
    return res;
  }
  /* ------CREATE CATEGORY API -----*/

  static async createCategory(data, token, shopId) {
    let header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    let res = await this.request(
      `categories?shopId=${shopId}`,
      data,
      "post",
      header
    );
    return res;
  }
  /* ------CATEGORY LIST API -----*/

  static async fetchCategoryList(shopId, page, pageSize, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `categories?shopId=${shopId}`,
      undefined,
      "get",
      header
    );
    return res;
  }
  /* ------CATEGORY PRODUCT LIST API -----*/

  static async fetchCategoryProductList(shopId, page, pageSize, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `categories/products?shopId=${shopId}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------UPDATECATEGORY LIST API -----*/

  static async updateCategory(data, token, _id, categorieId) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `categories/${categorieId}?shopId=${_id}`,
      data,
      "put",
      header
    );
    return res;
  }
  /* ------DELETECATEGORY LIST API -----*/

  static async deleteCategory(token, _id, openManage) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `categories/${openManage}?shopId=${_id}`,
      undefined,
      "delete",
      header
    );
    return res;
  }
  /* ------CREATE VOUCHER API -----*/

  static async createVoucher(token, shopId, data) {
    let header = {
      Authorization: `Bearer ${token}`,
    };
    let res = await this.request(
      `voucher?shopId=${shopId}`,
      data,
      "post",
      header
    );
    return res;
  }
  /* ------VOUCHER LIST API -----*/

  static async fetchVoucherList(shopId, page, pageSize, token, type) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `voucher?shopId=${shopId}&page=${page}&pageSize=${pageSize}&type=${type}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------DELETE VOUCHER API -----*/

  static async deleteVoucher(manage, _id, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `voucher/${manage}?shopId=${_id}`,
      undefined,
      "delete",
      header
    );
    return res;
  }

  /* ------ALL TESTIMONIALS API -----*/

  static async allTestimonial(_id, token, pageSize) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `testimonial?shopId=${_id}&pageSize=${pageSize}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------PENDDING TESTIMONIALS API -----*/

  static async filterTestimonial(_id, token, pageSize, status) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `testimonial?shopId=${_id}&pageSize=${pageSize}&status=${status}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------RESPONSE TESTIMONIALS API -----*/

  static async responseTestimonial(_id, token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `testimonial/response?shopId=${_id}`,
      data,
      "post",
      header
    );
    return res;
  }

  /* ------RESPONSE TESTIMONIALS API -----*/

  static async reportTestimonial(_id, token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `testimonial/report?shopId=${_id}`,
      data,
      "post",
      header
    );
    return res;
  }

  /* ------CERTIFICATE LIST API -----*/

  static async fetchCertificateList(shopId, token, page, key) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `certificates/product?shopId=${shopId}&pageSize=${page}&search=${key}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------CERTIFICATE ADD API -----*/

  static async addCertificate(shopId, token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `certificates/product?shopId=${shopId}`,
      data,
      "post",
      header
    );
    return res;
  }

  /* ------PRODUCT LIST FOR CERTIFICATE API -----*/

  static async productCertificate(shopId, token, key) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `certificates/product-list?shopId=${shopId}&search=${key}`,
      undefined,
      "get",
      header
    );
    return res;
  }
}

export default ProductSublyApi;
