import express from "express"; // Importing the Express library

const app = express.Router(); // Creating a new Express Router instance for defining routes

// Importing middleware functions for authentication and role-checking
import { auth, isAdmin, isInstructor } from "../middlewares/auth.js";

// Importing controller functions to handle the logic for different routes
import {
  updateProfile, // Controller function to handle profile updates
  updateUserProfileImage, // Controller function to handle profile image updates
  getUserDetails, // Controller function to fetch user details
  getEnrolledCourses, // Controller function to get courses a user is enrolled in
  deleteAccount, // Controller function to handle account deletion
  instructorDashboard, // Controller function to handle instructor dashboard details
  getAllStudents, // Controller to get all students
  getAllInstructors, // Controller to get all Instructors
} from "../controllers/profile.js";

// Route to delete a user's profile
// Uses the 'auth' middleware to ensure the user is authenticated
app.delete("/deleteProfile", auth, deleteAccount);

// Route to update a user's profile information
// Uses the 'auth' middleware to ensure the user is authenticated
app.put("/updateProfile", auth, updateProfile);

// Route to get details of a user
// Uses the 'auth' middleware to ensure the user is authenticated
app.get("/getUserDetails", auth, getUserDetails);

// Route to get a list of courses the user is enrolled in
// Uses the 'auth' middleware to ensure the user is authenticated
app.get("/getEnrolledCourses", auth, getEnrolledCourses);

// Route to update a user's profile image
// Uses the 'auth' middleware to ensure the user is authenticated
app.put("/updateUserProfileImage", auth, updateUserProfileImage);

// Route to get details for the instructor dashboard
// Uses the 'auth' middleware to ensure the user is authenticated
// Uses the 'isInstructor' middleware to ensure the user has the 'instructor' role
app.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

// Routes for admin to access all the student and instructor
app.get("/allStudents", auth, isAdmin, getAllStudents);
app.get("/allInstructors", auth, isAdmin, getAllInstructors);

// Exporting the router to be used in other parts of the application
export default app;
