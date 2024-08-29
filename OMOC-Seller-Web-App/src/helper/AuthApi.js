import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

class AuthSublyApi {
  //token which interact with the API will be stored here.
  // static token;

  //required common header for each api calling.
  // static commonHeaders = {
  //   "api-key": process.env.REACT_APP_API_KEY_PAIR,
  //   "device-token":
  //     localStorage.getItem("linkiii_device_fireToken") != null
  //       ? localStorage.getItem("linkiii_device_fireToken")
  //       : localStorage.getItem("linkiii_device_token"),
  //   "device-id": localStorage.getItem("linkiii_device_id"),
  //   "device-type": "3",
  // };

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

  /* ------SIGNUP API -----*/

  static async signUp(data) {
    let res = await this.request(`auth/seller/signup`, data, "post");
    return res;
  }

  /* ------LOGIN API -----*/

  static async login(data) {
    let res = await this.request(`auth/seller/login`, data, "post");
    return res;
  }

  /* ------LOGIN and SIGNUP with GOOGLE API -----*/

  static async googleAuth(token) {
    let res = await this.request(
      `auth/seller-web/google?token=${token}`,
      undefined,
      "get"
    );
    return res;
  }
}

export default AuthSublyApi;
