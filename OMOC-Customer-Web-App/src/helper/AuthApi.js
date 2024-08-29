import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

class AuthSublyApi {
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
    let res = await this.request(`auth/user/signup`, data, "post");
    return res;
  }

  /* ------LOGIN API -----*/

  static async login(data) {
    let res = await this.request(`auth/user/login`, data, "post");
    return res;
  }

  /* ------LOGIN and SIGNUP with GOOGLE API -----*/

  static async googleAuth(token) {
    let res = await this.request(
      `auth/user-web/google?token=${token}`,
      undefined,
      "get"
    );
    return res;
  }

  /* ------OTP VERIFY API -----*/

  static async verifyOtp(data) {
    let res = await this.request(`auth/user/verify-otp`, data, "post");
    return res;
  }

  /* ------INTREST API -----*/

  static async getIntrest(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`user/profile`, undefined, "get", header);
    return res;
  }
  /* ------UPDATE INTREST API -----*/

  static async updateInterest(token, interests) {
    let header = { Authorization: `Bearer ${token}` };
    let data = { interests }; // Assuming interests is the data to be updated
    let res = await this.request(`user/profile`, data, "put", header);
    return res;
  }

  /* ------SUGGESTION API -----*/

  static async getSuggestion(token, pageSize, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `user/suggestions?pageSize=${pageSize}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------FOLLOW API -----*/

  static async followUser(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`user/follow`, data, "post", header);
    return res;
  }

  /* ------UNFOLLOW API -----*/

  static async unFollowUser(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`user/un-follow`, data, "post", header);
    return res;
  }
  /* ------FORGOT PASSWORD API -----*/

  static async forgotPassword(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `auth/user/forgot-password`,
      data,
      "post",
      header
    );
    return res;
  }
  /* ------OTP API -----*/

  static async otpResetPassword(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `auth/user/verify-password-otp`,
      data,
      "post",
      header
    );
    return res;
  }
  /* ------CHANGE PASSWORD API -----*/

  static async changePassword(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `auth/user/change-password`,
      data,
      "post",
      header
    );
    return res;
  }

  /* -------DELETE USER------- */

  static async deleteUser(token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`user`, undefined, "delete", header);
    return res;
  }
}

export default AuthSublyApi;
