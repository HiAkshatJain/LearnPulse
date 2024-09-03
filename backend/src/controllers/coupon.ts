import { Request, Response, NextFunction } from "express";
import { Coupon } from "../models/coupon.js"; // Adjust the import path according to your project structure
import ErrorHandler from "../utils/errorHandler.js"; // Adjust the import path according to your project structure

// Middleware to handle errors
export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

// Controller to create a new coupon
export const newCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code, amount } = req.body;

  if (!code || !amount) {
    return next(new ErrorHandler("Please enter both coupon and amount", 400));
  }

  const coupon = await Coupon.create({ code, amount });

  return res.status(201).json({
    success: true,
    message: `Coupon ${coupon.code} Created Successfully`,
  });
};

// Controller to apply a discount
export const applyDiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { coupon } = req.query;

  const discount = await Coupon.findOne({ code: coupon });

  if (!discount) {
    return next(new ErrorHandler("Invalid Coupon Code", 400));
  }

  return res.status(200).json({
    success: true,
    discount: discount.amount,
  });
};

// Controller to get all coupons
export const allCoupons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const coupons = await Coupon.find({});

  return res.status(200).json({
    success: true,
    coupons,
  });
};

// Controller to get a specific coupon by ID
export const getCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const coupon = await Coupon.findById(id);

  if (!coupon) {
    return next(new ErrorHandler("Invalid Coupon ID", 400));
  }

  return res.status(200).json({
    success: true,
    coupon,
  });
};

// Controller to update an existing coupon
export const updateCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { code, amount } = req.body;

  const coupon = await Coupon.findById(id);

  if (!coupon) {
    return next(new ErrorHandler("Invalid Coupon ID", 400));
  }

  if (code) coupon.code = code;
  if (amount) coupon.amount = amount;

  await coupon.save();

  return res.status(200).json({
    success: true,
    message: `Coupon ${coupon.code} Updated Successfully`,
  });
};

// Controller to delete a coupon
export const deleteCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) {
    return next(new ErrorHandler("Invalid Coupon ID", 400));
  }

  return res.status(200).json({
    success: true,
    message: `Coupon ${coupon.code} Deleted Successfully`,
  });
};
