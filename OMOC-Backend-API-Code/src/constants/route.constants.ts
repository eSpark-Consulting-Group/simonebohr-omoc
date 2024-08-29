const AUTH_ROUTES = {
  DEFAULT: '/auth',
  SELLER: {
    LOGIN: '/seller/login',
    SIGNUP: '/seller/signup',
    VERIFY_OTP: '/seller/verify-otp',
  },
  USER: {
    LOGIN: '/user/login',
    SIGNUP: '/user/signup',
    VERIFY_OTP: '/user/verify-otp',
  },
  SOCIAL_LOGIN: '/social-login',
};

export const RoutesConstants = {
  AUTH: AUTH_ROUTES,
  HEALTH: '/health',
  NOT_FOUND: '*',
};
