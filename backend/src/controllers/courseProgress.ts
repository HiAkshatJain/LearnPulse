import { SubSection } from "../models/subSection.js";
import { CourseProgress } from "../models/courseProgress.js";
import { Request, Response } from "express";

export const updateCourseProgress = async (req: Request, res: Response) => {
  // Extract course ID, subsection ID, and user ID from request body and user object
  const { courseId, subsectionId } = req.body; //@ts-ignore
  const userId = req.user?.id;

  try {
    // Find the subsection by ID to ensure it exists
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
    }

    // Find the user's progress record for the specified course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    // Check if the user's progress record exists
    if (!courseProgress) {
      // If the progress record does not exist, return an error
      return res.status(404).json({
        success: false,
        message: "Course progress does not exist",
      });
    } else {
      // If the progress record exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" });
      }

      // Add the subsection ID to the completedVideos array
      courseProgress.completedVideos.push(subsectionId);
    }

    // Save the updated course progress record to the database
    await courseProgress.save();

    // Return a success response
    return res.status(200).json({ message: "Course progress updated" });
  } catch (error) {
    // Log any errors and return an internal server error response
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
