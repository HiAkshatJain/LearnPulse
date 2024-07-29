import { Request, Response } from "express";
import { Course } from "../models/course.js";
import { RatingAndReview } from "../models/ratingAndreview.js";
import mongoose from "mongoose";

// Handler to create a new rating and review for a course
export const createRating = async (req: Request, res: Response) => {
  try {
    // Extract rating, review, and courseId from request body
    const { rating, review, courseId } = req.body;

    // Extract userId from the request object
    const userId = req.user?.id;

    // Validate that all required fields are present
    if (!rating || !review || !courseId) {
      return res.status(401).json({
        success: false,
        message: "All fields are required", // Corrected typo from "fileds" to "fields"
      });
    }

    // Check if the user is enrolled in the course
    const courseDetails = await Course.findOne(
      { _id: courseId },
      {
        studentsEnrolled: { $elemMatch: { $eq: userId } },
      }
    );

    // Respond with an error if the course does not exist or the user is not enrolled
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    // Check if the user has already reviewed this course
    const alreadyReviewed = await RatingAndReview.findOne({
      course: courseId,
      user: userId,
    });

    // Respond with an error if the user has already reviewed the course
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }

    // Create a new rating and review entry in the database
    const ratingReview = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating,
      review,
    });

    // Link the new rating and review to the course
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    // Respond with success and the newly created rating and review
    return res.status(200).json({
      success: true,
      data: ratingReview,
      message: "Rating and Review created Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    return res.status(500).json({
      success: false,
      message: "Error while creating rating and review",
    });
  }
};

// Handler to get the average rating for a course
export const getAverageRating = async (req: Request, res: Response) => {
  try {
    // Extract course ID from request body
    const courseId = req.body.courseId;

    // Calculate the average rating using aggregation
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // Respond with the average rating if available
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // If no ratings exist, respond with a message indicating no ratings have been given
    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    // Handle any errors that occur during the aggregation process
    return res.status(500).json({
      success: false,
      message: "Error while calculating average rating", // Corrected typo from "No reviews founnd" to "Error while calculating average rating"
    });
  }
};

// Handler to get all ratings and reviews for courses
export const getAllRatingReview = async (req: Request, res: Response) => {
  try {
    // Fetch all ratings and reviews, sorting by rating in descending order and populating user and course details
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image", // Include user details in the response
      })
      .populate({
        path: "course",
        select: "courseName", // Include course details in the response
      })
      .exec();

    // Respond with all fetched reviews
    return res.status(200).json({
      success: true,
      data: allReviews,
      message: "All reviews fetched successfully",
    });
  } catch (error) {
    // Handle any errors that occur during fetching
    return res.status(500).json({
      success: false,
      message: "Error while fetching all ratings",
    });
  }
};
