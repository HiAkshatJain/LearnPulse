// Importing the express module
import express from "express";

// Creating an instance of the Express router
const app = express.Router();

// Importing controller functions for authentication
import { capturePayment, verifyPayment } from "../controllers/payments.js";

// Importing middleware function for authentication
import { auth, isStudent } from "../middlewares/auth.js";

//Roues for payment
app.post("/capturePayment", auth, isStudent, capturePayment);
app.post("/verifyPayment", auth, isStudent, verifyPayment);

// Exporting the Express router instance with defined routes
export default app;
