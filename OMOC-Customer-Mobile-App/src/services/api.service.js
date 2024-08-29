import { checkNullAndUndefined } from "../utils";
import AxiosConfig from "../utils/api";
export default class ApiService {
  static async getAllProducts({ shopId }) {
    try {
      const response = await AxiosConfig.get(`/products?shopId=${shopId}`);
      return response;
    } catch (error) {
      console.log("product add error", JSON.stringify(error));
    }
  }

  static async getProductDetail({ productId, isSearched }) {
    try {
      const response = await AxiosConfig.get(
        `/products/${productId}?isSearched=${isSearched}`
      );
      return response.data;
    } catch (error) {
      console.log("product add error", JSON.stringify(error.response.data));
    }
  }

  static async addToCartProduct({ productId, quantity }) {
    try {
      const response = await AxiosConfig.post(`/cart`, {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCartList() {
    try {
      const response = await AxiosConfig.get(`/cart`);
      return response.data;
    } catch (error) {
      console.log("get cart list error", JSON.stringify(error));
    }
  }

  static async GetAllAddresses(isPrimary) {
    try {
      const url = isPrimary ? `/address?isPrimary=${isPrimary}` : `/address`;
      const response = await AxiosConfig.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addNewAddress(data) {
    try {
      const response = await AxiosConfig.post(`/address`, data);
      return response.data;
    } catch (error) {
      console.log("add address error", JSON.stringify(error));
    }
  }
  static async getTour() {
    try {
      const response = await AxiosConfig.get(`/cart/tour-completed`);
      return response.data;
    } catch (error) {
      console.log("add address error", JSON.stringify(error));
    }
  }

  static async placeNewOrder(data) {
    try {
      const response = await AxiosConfig.post(`/orders`, data);
      console.log(JSON.stringify(response));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async GetOrder() {
    try {
      const response = await AxiosConfig.get(`/orders`);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log("get cart list error", JSON.stringify(error));
    }
  }

  static async postUpdateInterest(data, headers = {}) {
    try {
      const response = await AxiosConfig.put(`/user/profile`, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.log("postUpdateInterest error", JSON.stringify(error));
      throw error;
    }
  }

  static async GetInterest() {
    try {
      const response = await AxiosConfig.get(`/user/interests`);
      console.log(JSON.stringify(response.data));
      return response;
    } catch (error) {
      console.log("setProfileand error", JSON.stringify(error));
      throw error;
    }
  }

  static async GetProfileInterest() {
    try {
      const response = await AxiosConfig.get(`/user/profile`);
      console.log(JSON.stringify(response.data));
      return response;
    } catch (error) {
      console.log("setProfileand error", JSON.stringify(error));
      throw error;
    }
  }

  static async postUpdateAddress(id, data) {
    try {
      const response = await AxiosConfig.put(`/address/${id}`, data);
      return response.data;
    } catch (error) {
      console.log("postUpdateAddress error", JSON.stringify(error));
      throw error;
    }
  }
  static async deleteAddress(id) {
    try {
      const response = await AxiosConfig.delete(`/address/${id}`);
      return response.data;
    } catch (error) {
      console.log("DeleteAddress error", JSON.stringify(error));
      throw error;
    }
  }

  static async getRating(reviewGiven) {
    try {
      const url = `/rating?reviewGiven=${reviewGiven}`;
      const response = await AxiosConfig.get(url);
      return response.data;
    } catch (error) {
      console.log("getRating error", JSON.stringify(error));
      throw error;
    }
  }

  static async postRating(data) {
    try {
      const response = await AxiosConfig.post(`/rating`, data);
      console.log(JSON.stringify(response.data));
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

  static async deleteCartItem(data) {
    try {
      const response = await AxiosConfig.post(`/cart/remove`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async editCartItem(data) {
    try {
      const response = await AxiosConfig.put(`/cart`, data);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log("Edit cart Error", JSON.stringify(error.response));
    }
  }

  static async newsletter() {
    try {
      const response = await AxiosConfig.get(`/settings/newsletter`);
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log("News letter Error", JSON.stringify(error.response));
    }
  }

  static async newsletterPost(data) {
    try {
      const response = await AxiosConfig.post(`/settings/newsletter`, data);
      return response.data;
    } catch (error) {
      console.log(
        "Newsletter Notification sending Error",
        JSON.stringify(error.response)
      );
    }
  }

  static async notificationPost(data) {
    try {
      const response = await AxiosConfig.post(
        `/settings/user-notification`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(
        "Newsletter Notification sending Error",
        JSON.stringify(error.response)
      );
    }
  }

  static async notifySetting() {
    try {
      const response = await AxiosConfig.get(`/settings/user-notification`);
      return response.data;
    } catch (error) {
      console.log("Notification setting Error", JSON.stringify(error.response));
    }
  }

  static async addWishlist(data) {
    try {
      const response = await AxiosConfig.post(`/wishlist`, data);
      return response.data;
    } catch (error) {
      console.log("Add wishlist Error", JSON.stringify(error.response));
    }
  }
  static async getWishlist() {
    try {
      const response = await AxiosConfig.get(`/wishlist`);
      return response.data;
    } catch (error) {
      console.log("Add wishlist Error", JSON.stringify(error.response));
    }
  }

  static async createStory(param) {
    try {
      const response = await AxiosConfig.post(`/stories`, param);
      return response.data;
    } catch (error) {
      console.log("image upload error", JSON.stringify(error));
    }
  }

  static async GetAllUsersHavingStory() {
    try {
      const response = await AxiosConfig.get(`/stories`);
      return response.data;
    } catch (error) {
      console.log("Get All Users Having Story", JSON.stringify(error.response));
      throw error;
    }
  }

  static async getProductWishlist(id) {
    try {
      const response = await AxiosConfig.get(`/wishlist/products/${id}`);
      return response.data;
    } catch (error) {
      console.log("Add wishlist Error", JSON.stringify(error.response));
    }
  }
  static async addWishlistProduct(data) {
    try {
      const response = await AxiosConfig.post(`/wishlist/add-product`, data);
      return response.data;
    } catch (error) {
      console.log("Add wishlist Error", JSON.stringify(error.response));
    }
  }

  static async removeWishlistProduct(data) {
    try {
      const response = await AxiosConfig.post(`/wishlist/delete-product`, data);
      return response.data;
    } catch (error) {
      console.log("Add wishlist Error", JSON.stringify(error.response));
    }
  }

  static async getHomeCategory(id) {
    try {
      const response = await AxiosConfig.get(`/categories/all-list`);
      return response.data;
    } catch (error) {
      console.log("Add wishlist Error", JSON.stringify(error.response));
    }
  }

  static async getHomeBanner(id) {
    try {
      const response = await AxiosConfig.get(`/banner`);
      return response.data;
    } catch (error) {
      console.log("Add wishlist Error", JSON.stringify(error.response));
    }
  }

  static async GetusersStoryById(userId) {
    try {
      const response = await AxiosConfig.get(`/stories/${userId}`);
      return response.data;
    } catch (error) {
      console.log("Get users Story By Id", JSON.stringify(error.response));
      throw error;
    }
  }

  static async getUserSuggestion() {
    try {
      const response = await AxiosConfig.get(`/user/suggestions`);
      return response.data;
    } catch (error) {
      console.log(
        "Error in Get users Suggestion list",
        JSON.stringify(error.response)
      );
      throw error;
    }
  }

  static async postUserFollow(data) {
    try {
      const response = await AxiosConfig.post(`/user/follow`, data);
      return response.data;
    } catch (error) {
      console.log(
        "Error in post the follow Suggestion list",
        JSON.stringify(error.response)
      );
      throw error;
    }
  }

  static async postUserUnfollow(data) {
    try {
      const response = await AxiosConfig.post(`/user/un-follow`, data);
      return response.data;
    } catch (error) {
      console.log(
        "Error in unfollow users Suggestion list",
        JSON.stringify(error.response)
      );
      throw error;
    }
  }

  static async getFavPostlist() {
    try {
      const { data } = await AxiosConfig.get(`/posts`);
      return data.data;
    } catch (error) {
      console.log(
        "Error in unfollow users Suggestion list",
        JSON.stringify(error.response)
      );
      throw error;
    }
  }

  static async postLikeAPI(LikeData) {
    try {
      const response = await AxiosConfig.post(`/posts/like`, LikeData);
      return response.data;
    } catch (error) {
      console.log(
        "Error in unfollow users Suggestion list",
        JSON.stringify(error.response)
      );
      throw error;
    }
  }

  static async getAllChatList(type) {
    try {
      const { data } = await AxiosConfig.get(`/chat/all?type=${type}`);
      return data;
    } catch (error) {
      console.log("Error not found chat list", JSON.stringify(error.response));
      throw error;
    }
  }

  static async getRequestChatList(status) {
    try {
      const { data } = await AxiosConfig.get(`/chat/request?isGroup=${status}`);
      return data;
    } catch (error) {
      console.log("Error not found chat list", JSON.stringify(error.response));
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

  static async getCommentByPostId(Id) {
    try {
      const response = await AxiosConfig.get(`/posts/comment/${Id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async statusUpdate(data) {
    try {
      const response = await AxiosConfig.put(`/chat/request`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addCommentByPostId(commentParam) {
    try {
      const response = await AxiosConfig.post(`/posts/comment`, commentParam);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async likePostCommentByCommentId(commentParam) {
    try {
      const response = await AxiosConfig.post(
        `/posts/comment-like`,
        commentParam
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async replyToComment(replyParam) {
    try {
      const response = await AxiosConfig.post(
        `/posts/comment-reply`,
        replyParam
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async uploadMultipleImages(fromData) {
    try {
      const response = await AxiosConfig.post(
        `/assets/upload-multiple`,
        fromData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async createPost(data) {
    try {
      const response = await AxiosConfig.post(`/posts`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async createPost(data) {
    try {
      const response = await AxiosConfig.post(`/posts`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMessageStatusPopup() {
    try {
      const response = await AxiosConfig.get(`/user/user-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async statusMessageUpdate(data) {
    try {
      const response = await AxiosConfig.put(`/user/user-info`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getFollowingList() {
    try {
      const response = await AxiosConfig.get(`/user/following`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getLocationsListApi(q) {
    try {
      const response = await AxiosConfig.get(`/address/search?search=${q}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getStoryCommentsCommentByStoryId(Id) {
    try {
      const response = await AxiosConfig.get(`/stories/comment/${Id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addCommentOnStoryBystoryId(commentParam) {
    try {
      const response = await AxiosConfig.post(`/stories/comment`, commentParam);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async replyToStoryComment(replyParam) {
    try {
      const response = await AxiosConfig.post(
        `/stories/comment-reply`,
        replyParam
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMyStories() {
    try {
      const response = await AxiosConfig.get(`/stories/my-stories?sort=true`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getRecentSearchList() {
    try {
      const response = await AxiosConfig.get(`/user/feed-history`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserSuggestions(q) {
    try {
      const response = await AxiosConfig.get(`/user/search-feed?text=${q}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getUsersProfile(id) {
    try {
      const response = await AxiosConfig.get(
        `/user/profile/${id}?isSearched=true`
      );
      console.log("get Users Profile", JSON.stringify(response.data));
      return response;
    } catch (error) {
      console.log("get Users Profile error", JSON.stringify(error));
      throw error;
    }
  }
  static async removeRecentSearch(id) {
    try {
      const uri = !checkNullAndUndefined(id)
        ? `/user/feed-history?historyId=${id}`
        : `/user/feed-history`;
      const response = await AxiosConfig.delete(uri);
      console.log("checkNullAndUndefined", JSON.stringify(response));
      return response;
    } catch (error) {
      console.log(
        "remove recent search response error",
        JSON.stringify(error.response)
      );
      throw error;
    }
  }

  static async getExploreApi(param) {
    try {
      const response = await AxiosConfig.post(`/user/explore`, param);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getExploreSuggetionApi(param) {
    try {
      const response = await AxiosConfig.post(`/user/explore`, param);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getExplorSearchPostsApi(param) {
    try {
      const response = await AxiosConfig.get(`/user/explore-search`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTrendingDataApi(q) {
    try {
      const response = await AxiosConfig.get(
        `/user/search-trending?search=${q}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addPaymentCardApi(param) {
    try {
      const response = await AxiosConfig.post(`/payment/add-card`, param);
      return response.data;
    } catch (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    }
  }

  static async getPaymentsCardApi() {
    try {
      const response = await AxiosConfig.get(`/payment/get-cards`);
      return response.data;
    } catch (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    }
  }

  static async deletePaymentCard(id) {
    try {
      const response = await AxiosConfig.delete(`payment/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createVideo(data, type) {
    try {
      const response = await AxiosConfig.post(`/videos`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getAllVideos() {
    try {
      const response = await AxiosConfig.get(`/videos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
