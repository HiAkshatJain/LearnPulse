const SERVER_URL = import.meta.env.SERVER_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: SERVER_URL + "/auth/sendotp",
  SIGNUP_API: SERVER_URL + "/auth/signup",
  LOGIN_API: SERVER_URL + "/auth/login",
  RESETPASSTOKEN_API: SERVER_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: SERVER_URL + "/auth/reset-password",
};
