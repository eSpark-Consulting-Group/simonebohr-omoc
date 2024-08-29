import axios from "axios";
import StorageService from "../../services/storage.service";

const AxiosConfig = axios.create({
  baseURL: "http://13.49.17.24:4000/v1",
});

AxiosConfig.interceptors.request.use(
  async (res) => {
    const data = await StorageService.getUser();
    const result = JSON.parse(data);
    if (result) {
      res.headers.Authorization = "Bearer " + result.token;
    }
    return res;
  },

  (error) => Promise.reject(error)
);

export default AxiosConfig;
