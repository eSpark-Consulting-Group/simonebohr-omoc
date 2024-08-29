import { Alert } from "react-native";
import AxiosConfig from "../utils/api";
export default class ApiService {
  static async createProduct({ shopId, product }) {
    try {
      const response = await AxiosConfig.post(
        `/products?shopId=${shopId}`,
        product
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getAllOrdersList({ shopId, status }) {
    try {
      const response = await AxiosConfig.get(
        `/dashboard/orders?shopId=${shopId}&status=${status}`
      );
      return response;
    } catch (error) {
      console.log("orders list error", JSON.stringify(error));
    }
  }

  static async postOrderStatus({ shopId, data }) {
    try {
      const response = await AxiosConfig.post(
        `/dashboard/fulfill?shopId=${shopId}`,
        data
      );
      return response;
    } catch (error) {
      console.log("orders list error", JSON.stringify(error));
    }
  }
  static async addProductImages(param) {
    try {
      const response = await AxiosConfig.post(`assets`, param, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("image upload error", JSON.stringify(error));
    }
  }

  static async getProductsByShopId({ shopId }) {
    try {
      const response = await AxiosConfig.get(
        `/products/seller?shopId=${shopId}`
      );
      return response;
    } catch (error) {
      console.log("orders list error", JSON.stringify(error));
    }
  }
  static async getTestimonialList({ shopId }) {
    try {
      const response = await AxiosConfig.get(`/testimonial?shopId=${shopId}`);
      return response;
    } catch (error) {
      console.log("Testimonial list error", JSON.stringify(error));
    }
  }

  static async createNewShop(param) {
    try {
      const response = await AxiosConfig.post(`/business-info`, param);
      return response.data;
    } catch (error) {
      console.log("create new shop error", JSON.stringify(error));
    }
  }

  static async addCategorieApi(shopId, formData) {
    try {
      const response = await AxiosConfig.post(
        `/categories?shopId=${shopId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("create new category error", JSON.stringify(error));
    }
  }

  static async getAllCategoriesByShopId({ shopId }) {
    try {
      const response = await AxiosConfig.get(`/categories?shopId=${shopId}`);
      return response.data;
    } catch (error) {
      console.log("categories list error", JSON.stringify(error));
    }
  }

  static async editCategorieApi(shopId, categoryId, formData) {
    try {
      const response = await AxiosConfig.put(
        `/categories/${categoryId}?shopId=${shopId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("edit category error", JSON.stringify(error));
    }
  }

  static async getCategoryDetailApi({ shopId, categoryId }) {
    try {
      const response = await AxiosConfig.get(
        `/categories/${categoryId}?shopId=${shopId}`
      );
      return response.data;
    } catch (error) {
      console.log("get category detail error", JSON.stringify(error));
    }
  }

  static async deleteCategoryDetailApi({ shopId, categoryId }) {
    try {
      const response = await AxiosConfig.delete(
        `/categories/${categoryId}?shopId=${shopId}`
      );
      return response.data;
    } catch (error) {
      console.log("delete category error", JSON.stringify(error));
    }
  }

  static async addVoucherApi(shopId, param) {
    try {
      const response = await AxiosConfig.post(
        `/voucher?shopId=${shopId}`,
        param
      );
      return response.data;
    } catch (error) {
      console.log("add Voucher error", JSON.stringify(error));
    }
  }

  static async getAllVouchersApi({ shopId }) {
    try {
      const response = await AxiosConfig.get(`/voucher?shopId=${shopId}`);
      return response.data;
    } catch (error) {
      console.log("get all Vouchers error", JSON.stringify(error));
    }
  }

  static async deleteVoucherApi({ shopId, voucherId }) {
    try {
      const response = await AxiosConfig.delete(
        `/voucher/${voucherId}?shopId=${shopId}`
      );
      return response.data;
    } catch (error) {
      console.log("delete category error", JSON.stringify(error));
    }
  }

  static async deleteProductApi({ shopId, productId }) {
    try {
      const response = await AxiosConfig.delete(
        `/products/${productId}?shopId=${shopId}`
      );
      return response.data;
    } catch (error) {
      console.log("delete category error", JSON.stringify(error));
    }
  }

  static async getAllWarehousesApi(shopId) {
    try {
      const response = await AxiosConfig.get(
        `/address/warehouse?shopId=${shopId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getChatApi() {
    try {
      const { data } = await AxiosConfig.get(`/chat/all`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async oneToOneChat(data) {
    try {
      const response = await AxiosConfig.post(`/chat`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getGeneralInfo(shopId) {
    try {
      const { data } = await AxiosConfig.get(
        `/business-info/details?shopId=${shopId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async editGeneralInfo(shopId, editData) {
    try {
      console.log(editData);
      const { data } = await AxiosConfig.put(
        `/business-info?shopId=${shopId}`,
        editData
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllmessge(Id) {
    try {
      const { data } = await AxiosConfig.get(`/message/${Id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async sendmessge(Id, data) {
    try {
      const response = await AxiosConfig.post(`/message/${Id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async createPostApi(Id, data) {
    try {
      const response = await AxiosConfig.post(`/posts?shopId=${Id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async imageUpload(data) {
    try {
      const response = await AxiosConfig.post(`/assets`, data);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getShipping(shopId) {
    try {
      const { data } = await AxiosConfig.get(`/shipping?shopId=${shopId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async editShipping(Id, shopId, editData) {
    try {
      const { data } = await AxiosConfig.put(
        `/shipping/${Id}?shopId=${shopId}`,
        editData
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async addShipping(shopId, Data) {
    try {
      const { data } = await AxiosConfig.post(
        `/shipping?shopId=${shopId}`,
        Data
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteShipping(Id, shopId) {
    try {
      const { data } = await AxiosConfig.delete(
        `/shipping/${Id}?shopId=${shopId}`
      );
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  static async getListOfShip() {
    try {
      const { data } = await AxiosConfig.get(`/shipping/region`);
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
  static async getListOfFaq(shopId) {
    try {
      const { data } = await AxiosConfig.get(`/faq/general?shopId=${shopId}`);
      return data;
    } catch (error) {
      throw error;
      console.log(error.response.data);
    }
  }
  static async verifyOtp(params) {
    try {
      const response = await AxiosConfig.post("/auth/seller/verify-otp", {
        email: params.email,
        otp: params.otp,
      });
      return response;
    } catch (error) {
      console.log("verify error", JSON.stringify(error));
      throw error;
    }
  }
}
