import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

class PaymentApi {
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
  static async addPayment(token, data) {
    let header = { Authorization: `Bearer ${token}` };

    let res = await this.request(`payment/add-card`, data, "post", header);
    return res;
  }

  static async getAllPayment(token) {
    let header = { Authorization: `Bearer ${token}` };

    return this.request(`payment/get-cards`, null, "get", header);
  }
}

export default PaymentApi;
