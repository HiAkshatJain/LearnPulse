import mongoose from "mongoose";

interface ICourseProgress extends Document {
  courseID: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  completedVideos: mongoose.Types.ObjectId[];
}

// Define the schema for CourseProgress documents
const courseProgressSchema = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Reference to the Course model
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection", // Reference to the SubSection model
    },
  ],
});

export const CourseProgress = mongoose.model<ICourseProgress>(
  "CourseProgress",
  courseProgressSchema
);
