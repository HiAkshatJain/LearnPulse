// Importing the express module
import express from "express";

// Creating an instance of the Express router
const app = express.Router();

// Importing controller functions for authentication
import { signup, sendOTP, login, changePassword } from "../controllers/auth.js";

// Importing middleware function for authentication
import { auth } from "../middlewares/auth.js";

// Importing controller functions for password reset
import {
  resetPassword,
  resetPasswordToken,
} from "../controllers/resetPassword.js";

// Routes for handling different authentication and password-related actions
app.post("/signup", signup); // Route for user signup
app.post("/sendotp", sendOTP); // Route for sending OTP for authentication
app.post("/login", login); // Route for user login
app.use("/changepassword", auth, changePassword); // Route for changing password, with authentication middleware

// Routes for handling password reset requests
app.post("/reset-password-token", resetPasswordToken); // Route for requesting a password reset token
app.post("/reset-password", resetPassword); // Route for resetting the password

// Exporting the Express router instance with defined routes
export default app;
