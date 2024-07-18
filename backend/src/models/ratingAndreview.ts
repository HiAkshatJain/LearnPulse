import mongoose, { Document } from "mongoose";

// Define interface for RatingAndReview document
interface RatingAndReviewDocument extends Document {
  user: mongoose.Types.ObjectId; // ObjectId referencing User document
  rating: string; // Rating value as a string
  review: string; // Review text
  course: mongoose.Types.ObjectId; // ObjectId referencing Course document
}

// Define mongoose schema for RatingAndReview
const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Field type: ObjectId
    ref: "User", // Reference to User model
    required: true, // Field is required
  },
  rating: {
    type: String, // Field type: String
    required: true, // Field is required
  },
  review: {
    type: String, // Field type: String
    required: true, // Field is required
  },
  course: {
    type: mongoose.Schema.Types.ObjectId, // Field type: ObjectId
    required: true, // Field is required
    ref: "Course", // Reference to Course model
    index: true, // Create index on course field for efficient querying
  },
});

// Define and export RatingAndReview model
export const RatingAndReview = mongoose.model<RatingAndReviewDocument>(
  "RatingAndReview",
  ratingAndReviewSchema
);
