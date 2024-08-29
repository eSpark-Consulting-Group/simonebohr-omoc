import AxiosConfig from "../api";

export const signUpWithEmailAndPassword = async (params) => {
  try {
    const response = await AxiosConfig.post("/auth/user/signup", {
      email: params.email,
      password: params.password,
      name: params.name,
      userName: params.userName,
      age: params.age,
    });
    return response;
  } catch (error) {
    console.log("signUp error", JSON.stringify(error));
    throw error;
  }
};
export const verifyOpt = async (params) => {
  try {
    const response = await AxiosConfig.post("/auth/user/verify-otp", {
      email: params.email,
      otp: params.otp,
    });
    return response;
  } catch (error) {
    console.log("verify error", JSON.stringify(error));
    throw error;
  }
};

export const signInWithEmailAndPassword = async (params) => {
  try {
    const response = await AxiosConfig.post("/auth/user/login", {
      email: params.email,
      password: params.password,
    });
    return response;
  } catch (error) {
    console.log("signIn error", JSON.stringify(error));
    throw error;
  }
};

export const setProfileAndFavCategory = async (params) => {
  try {
    const response = await AxiosConfig.put("/user/profile", {
      email: params.email,
      password: params.password,
      name: params.name,
      bio: params.bio,
      language: params.language,
      phone: params.phone,
      interests: params.interests || [],
    });
    return response;
  } catch (error) {
    console.log("setProfileand error", JSON.stringify(error));
    throw error;
  }
};

export const setGoogleLogin = async (token) => {
  try {
    const response = await AxiosConfig.get("/auth/user/google", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("google server error", JSON.stringify(error));
    throw error;
  }
};

export const forgotPasswordAPI = async (params) => {
  try {
    const response = await AxiosConfig.post(
      "/auth/user/forgot-password",
      params
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordOtpVerify = async (params) => {
  try {
    const response = await AxiosConfig.post(
      "/auth/user/verify-password-otp",
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeWithForgotPassword = async (params) => {
  try {
    const response = await AxiosConfig.post(
      "/auth/user/change-password",
      params
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
