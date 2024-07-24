import { Request, Response } from "express"; // Importing Request and Response types from Express for handling HTTP requests and responses
import { User } from "../models/user.js"; // Importing User model from "../models/user.js" to interact with user data in the database
import crypto from "crypto"; // Importing crypto module for generating secure tokens and hashes
import bcrypt from "bcrypt"; // Importing bcrypt for hashing passwords securely
import { mailSender } from "../utils/mailSender.js"; // Importing mailSender function from "../utils/mailSender.js" for sending emails
import { ResetPasswordTypes } from "../types/resetPassword/ResetPasswordTypes.js"; // Importing ResetPasswordTypes type from "../types/resetPassword/resetPasswordTypes.js" for defining the structure of request body in reset password functionality

// Generate a reset password token and send a reset password email
export const resetPasswordToken = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your Email is not registered with us",
      });
    }

    // Generate a random token
    const token = crypto.randomBytes(20).toString("hex");

    // Update user with the generated token and expiration time
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    ); // by marking true, it will return updated user

    // Construct the reset password URL
    const url = `https://learnpulse.netlify.app/update-password/${token}`;

    // Send email with reset password URL
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link: ${url}`
    );

    // Respond with success message
    res.status(200).json({
      success: true,
      message:
        "Email sent successfully, please check your mailbox and change password",
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "Error while creating token for reset password",
    });
  }
};

// Reset password using the provided token
export const resetPassword = async (
  req: Request<{}, {}, ResetPasswordTypes>,
  res: Response
) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // Validation
    if (!token || !password || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Find user by token
    const userDetails = await User.findOne({ token: token });

    // Check if token matches user's token for security
    if (!userDetails || token !== userDetails.token) {
      return res.status(401).json({
        success: false,
        message: "Password reset token is invalid",
      });
    }

    // Check if token has expired
    //@ts-ignore
    if (!(userDetails.resetPasswordTokenExpires > Date.now())) {
      return res.status(401).json({
        success: false,
        message: "Token has expired, please regenerate token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "Error while resetting password",
    });
  }
};
