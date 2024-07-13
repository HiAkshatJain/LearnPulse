import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60, // The document will be automatically deleted after 3 minutes of its creation time
  },
});

async function sendVerificationEmail(email: string, otp: string) {
  try {
    mailSender(email, "Verification Email from LearnePulse", otp);
  } catch (error) {
    console.log("Error while sending an email to ", email);
  }
}

//Pre middleware to be written in this to chech the otp

export const OTP = mongoose.model("OTP", OTPSchema);
