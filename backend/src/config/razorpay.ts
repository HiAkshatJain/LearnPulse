import { config } from "dotenv";
import Razorpay from "razorpay";

config({
  path: "./../.env", // Path to the .env file that contains environment variables
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY || "",
  key_secret: process.env.RAZORPAY_SECRET || "",
});
