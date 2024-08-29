import axios from "axios";

// const BASE_URL = "http://16.171.237.241:4000/v1/";
const BASE_URL = process.env.REACT_APP_BASE_URL;


class DashboardSublyApi {
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

  /* ------CREATE SHOP API -----*/

  static async createShop(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`business-info`, data, "post", header);
    return res;
  }

  /* ------SHOP OTP VERIFICATION API -----*/

  static async shopOtpVerify(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`business-info/verify`, data, "post", header);
    return res;
  }

  /* ------DASHBOARD DATA API -----*/

  static async dashboardData(data) {
    let header = {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    };
    let res = await this.request(
      `dashboard?shopId=${data.shopId}`,
      undefined,
      undefined,
      header
    );
    return res;
  }
}

export default DashboardSublyApi;
