import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    requiured: true,
  },
  rating: {
    type: String,
    reqired: true,
  },
  review: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
    index: true,
  },
});

export const RatingAndReview = mongoose.model(
  "RatingAndReview",
  ratingAndReviewSchema
);
