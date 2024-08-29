import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

class SettingSublyApi {
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

  /* ------ UPDATE NEWSLATTER API -----*/

  static async newsLatter(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`settings/newsletter`, data, "post", header);
    return res;
  }

  /* ------ UPDATE NEWSLATTER API -----*/

  static async getNewsLatter(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `settings/newsletter`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------NOTIFICATION SETTINGS API -----*/

  static async getUserNotification(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `settings/user-notification`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------NOTIFICATION SETTINGS API -----*/

  static async postUserNotification(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `settings/user-notification`,
      data,
      "post",
      header
    );
    return res;
  }

  /* ------PERSONAL INFORMATION API -----*/

  static async fetchPersonalInformation(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`user/profile`, undefined, "get", header);
    return res;
  }

  static async upDatePersonalInformation(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`user/profile`, data, "put", header);
    return res;
  }

  /* ------FAQ API -----*/

  static async getFaq(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`faq/product`, undefined, "get", header);
    return res;
  }
}
export default SettingSublyApi;
