import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { Dispatch } from "@reduxjs/toolkit";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    // Create a new script element
    const script = document.createElement("script");
    script.src = src;

    // Resolve the promise with true when the script is successfully loaded
    script.onload = () => {
      resolve(true);
    };

    // Resolve the promise with false if there is an error loading the script
    script.onerror = () => {
      resolve(false);
    };

    // Append the script element to the body of the document
    document.body.appendChild(script);
  });
}

export function buyCourse(
  token: string,
  coursesId: string[],
  userDetails: { firstName: string; email: string },
  navigate: Function,
  dispatch: Dispatch
) {
  return async () => {
    const toastId = toast.loading("Loading...");

    try {
      // Load the Razorpay script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toast.error("RazorPay SDK failed to load");
        return;
      }

      // Initiate the order
      const orderResponse = await apiConnector({
        method: "POST",
        url: COURSE_PAYMENT_API,
        bodyData: { coursesId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message);
      }

      const RAZORPAY_KEY = import.meta.env.VITE_APP_RAZORPAY_KEY; // Make sure to have the correct environment variable setup

      // Set up Razorpay payment options
      const options = {
        key: RAZORPAY_KEY,
        currency: orderResponse.data.message.currency,
        amount: orderResponse.data.message.amount,
        order_id: orderResponse.data.message.id,
        name: "StudyNotion",
        description: "Thank You for Purchasing the Course",
        image: "none",
        prefill: {
          name: userDetails.firstName,
          email: userDetails.email,
        },
        handler: (response: any) => {
          // Send successful payment email
          sendPaymentSuccessEmail(
            response,
            orderResponse.data.message.amount,
            token
          );
          // Verify payment
          //@ts-ignore
          verifyPayment({ ...response, coursesId }, token, navigate, dispatch);
        },
      };
      //@ts-ignore
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", (response: any) => {
        toast.error("Oops, payment failed");
        console.log("Payment failed: ", response.error);
      });
    } catch (error: any) {
      console.error("PAYMENT API ERROR: ", error);
      toast.error(error.response?.data?.message || "Could not make payment");
    } finally {
      // Dismiss the toast loader
      toast.dismiss(toastId);
    }
  };
}

export async function sendPaymentSuccessEmail(
  response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
  },
  amount: number,
  token: string
): Promise<void> {
  try {
    await apiConnector({
      method: "POST",
      url: SEND_PAYMENT_SUCCESS_EMAIL_API,
      bodyData: {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("PAYMENT SUCCESS EMAIL ERROR: ", error);
  }
}

export async function verifyPayment(
  bodyData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature?: string;
    coursesId?: string[];
  },
  token: string,
  navigate: (path: string) => void,
  dispatch: Dispatch
): Promise<void> {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector({
      method: "POST",
      url: COURSE_VERIFY_API,
      bodyData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment successful, you are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error: any) {
    console.error("PAYMENT VERIFY ERROR: ", error);
    toast.error("Could not verify payment");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}
