const SERVER_URL = import.meta.env.VITE_SERVER_URL + "/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: SERVER_URL + "/auth/sendotp",
  SIGNUP_API: SERVER_URL + "/auth/signup",
  LOGIN_API: SERVER_URL + "/auth/login",
  RESETPASSTOKEN_API: SERVER_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: SERVER_URL + "/auth/reset-password",
};
