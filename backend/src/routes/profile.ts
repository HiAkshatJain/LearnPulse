import express from "express";

const app = express.Router();

import { auth, isInstructor } from "../middlewares/auth.js";

import {
  updateProfile,
  updateUserProfileImage,
  getUserDetails,
  getEnrolledCourses,
  deleteAccount,
  instructorDashboard,
} from "../controllers/profile.js";

app.delete("/deleteProfile", auth, deleteAccount);
app.put("/updateProfile", auth, updateProfile);
app.get("/getUserDetails", auth, getUserDetails);

app.get("/getEnrolledCourses", auth, getEnrolledCourses);

app.put("/updateUserProfileImage", auth, updateUserProfileImage);

// instructor Dashboard Details
app.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

export default app;
