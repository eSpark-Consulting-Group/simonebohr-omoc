import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

class OtherSettngSublyApi {
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

  /* ------SHOP SETTING  API -----*/

  static async postShopSetting(token, _id, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `shipping?shopId=${_id}`,
      data,
      "post",
      header
    );
    return res;
  }

  /* ------SHOP SETTING  API -----*/

  static async fetchShopSetting(token, shopId) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `shipping?shopId=${shopId}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------DELETE SHOP SETTING  API -----*/

  static async deleteShopSetting(token, shopId, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `shipping/${id}?shopId=${shopId}`,
      undefined,
      "delete",
      header
    );
    return res;
  }

  /* ------SHIPPIMG REGION  API -----*/

  static async shippingRegion(token, data, id) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`shipping/region`, data, "get", header);
    return res;
  }

  /* ------EDIT SHOP SETTING  API -----*/

  static async editShopSetting(token, data, id, shopId) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `shipping/${id}?shopId=${shopId}`,
      data,
      "put",
      header
    );
    return res;
  }

  /* ------GENERAL_INFORMATIOn  API -----*/

  static async generalInformation(token, shopId) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `business-info/details?shopId=${shopId}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------EDIT GENERAL INFORMATION  API -----*/

  static async editGeneralInformation(token, shopId, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `business-info?shopId=${shopId}`,
      data,
      "put",
      header
    );
    return res;
  }

  /* ------CREATE ADDs API -----*/

  static async createAdds(token, shopId, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `advertisement?shopId=${shopId}`,
      data,
      "post",
      header
    );
    return res;
  }
}

export default OtherSettngSublyApi;
