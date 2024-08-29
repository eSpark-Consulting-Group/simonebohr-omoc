import { theme } from "native-base";
import AxiosConfig from "../api";

export const signUpWithEmailAndPassword = async (params) => {
  try {
    const response = await AxiosConfig.post("auth/seller/signup", {
      email: params.email,
      password: params.password,
      resourceType: "app",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signInWithEmailAndPassword = async (params) => {
  try {
    const response = await AxiosConfig.post(
      "auth/seller/login",
      {
        email: params.email,
        password: params.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const businessInfoVerify = async (params) => {
  try {
    const response = await AxiosConfig.post("/business-info/verify", {
      email: params.email,
      otp: params.otp,
    });
    return response.data;
  } catch (error) {
    console.log("verify error", JSON.stringify(error));
  }
};

export const loginWithGoogle = async (token) => {
  try {
    const response = await AxiosConfig.get("/auth/seller/google", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("google signin error", JSON.stringify(error));
  }
};

export const forgotwithEmail = async (data) => {
  try {
    const response = await AxiosConfig.post(
      "/auth/seller/forgot-password",
      data
    );
    return response?.data;
  } catch (error) {
    console.log("forgot error", JSON.stringify(error));
    if (error?.response?.data?.message)
      error.message = error?.response?.data?.message;
    throw error;
  }
};

export const forgotPasswordOtpVerify = async (params) => {
  try {
    const response = await AxiosConfig.post(
      "/auth/seller/verify-password-otp",
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOpt = async (params) => {
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
};

export const changeWithForgotPassword = async (params) => {
  try {
    console.log(params);
    const response = await AxiosConfig.post(
      "/auth/seller/change-password",
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
