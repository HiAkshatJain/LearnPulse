import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
  allCoupons,
  applyDiscount,
  deleteCoupon,
  getCoupon,
  newCoupon,
  updateCoupon,
} from "../controllers/coupon.js";

const app = express.Router();

// route - /api/v1/payment/coupon/new
app.get("/discount", applyDiscount);

// route - /api/v1/payment/coupon/new
app.post("/coupon/new", isAdmin, newCoupon);

// route - /api/v1/payment/coupon/all
app.get("/coupon/all", isAdmin, allCoupons);

// route - /api/v1/payment/coupon/:id
app
  .route("/coupon/:id")
  .get(isAdmin, getCoupon)
  .put(isAdmin, updateCoupon)
  .delete(isAdmin, deleteCoupon);

// Exporting the Express router instance with defined routes
export default app;
