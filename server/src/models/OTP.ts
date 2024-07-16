import mongoose, { Document, Model } from "mongoose";
import { mailSender } from "../utils/mailSender.js";

// Define interface for OTP document
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

// Define the schema for OTP documents
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Email address is required
  },
  otp: {
    type: String,
    required: true, // OTP value is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value is current timestamp when document is created
    expires: 5 * 60, // Document will expire and be automatically deleted 5 minutes after createdAt time
  },
});

// Function to send verification email
async function sendVerificationEmail(
  email: string,
  otp: string
): Promise<void> {
  try {
    // Call mailSender function to send email with OTP
    mailSender(email, "Verification Email from LearnPulse", otp);
  } catch (error) {
    console.log(`Error while sending an email to ${email}: ${error}`);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

// Define OTP model with types
export const OTP = mongoose.model<IOTP>("OTP", OTPSchema);
