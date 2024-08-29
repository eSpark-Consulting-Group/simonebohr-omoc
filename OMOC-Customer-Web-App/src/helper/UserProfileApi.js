import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

class UserProfileSublyApi {
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

  /* ------FETCH POST LIST API -----*/

  static async fetchPostList(token, pageSize, page, sort) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `posts?pageSize=${pageSize}&page=${page}&sort=${sort}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------CREATE POST API -----*/

  static async createPostHandle(data, token) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`posts`, data, "post", header);
    return res;
  }

  /* ------FETCH STORY LIST API -----*/

  static async fetchStoryList(token, pageSize, page, sort) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(
      `posts?pageSize=${pageSize}&page=${page}&sort=${sort}`,
      undefined,
      "get",
      header
    );
    return res;
  }

  /* ------FETCH STORY LIST API -----*/

  static async postLike(token, data) {
    let header = { Authorization: `Bearer ${token}` };
    let res = await this.request(`posts/like`, data, "post", header);
    return res;
  }
}

export default UserProfileSublyApi;
