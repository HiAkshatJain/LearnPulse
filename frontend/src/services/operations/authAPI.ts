import { toast } from "react-hot-toast";

import { setLoading } from "../../slices/authSlice";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { SENDOTP_API } = endpoints;

import { Dispatch } from "redux";

// Assuming apiConnector is properly imported and defined elsewhere

export function sendOtp(email: string, navigate: any) {
  // Adjust 'any' to the appropriate type if possible
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector({
        method: "POST",
        url: SENDOTP_API,
        bodyData: {
          email,
          checkUserPresent: true,
        },
      });

      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error: any) {
      // Adjust 'any' to the appropriate error type if possible
      console.error("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
