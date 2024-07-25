//@ts-nocheck
import { Profile } from "../models/profile.js";
import { User } from "../models/user.js";
import { CourseProgress } from "../models/courseProgress.js";
import { Course } from "../models/course.js";

import {
  uploadImageToCloudinary,
  deleteResourceFromCloudinary,
} from "../utils/imageUploader.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";
import { Request, Response } from "express";
import { UserRequestBody } from "../types/profile/UpdateProfile.js";

export const updateProfile = async (
  req: Request<{}, {}, UserRequestBody>,
  res: Response
) => {
  try {
    const {
      gender = "",
      dateOfBirth = "",
      about = "",
      contactNumber,
      firstName,
      lastName,
    } = req.body;
    const userId = req.user?.id;

    const userDetails = await User.findById(userId);
    const profileId = userDetails?.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    userDetails!.firstName = firstName;
    userDetails!.lastName = lastName;
    await userDetails?.save();

    profileDetails!.gender = gender;
    profileDetails!.dateOfBirth = dateOfBirth;
    profileDetails!.about = about;
    profileDetails!.contactNumber = contactNumber;

    await profileDetails?.save();
    const updatedUserDetails = await User.findById(userId).populate({
      path: "additionalDetails",
    });
    res.status(200).json({
      success: true,
      updatedUserDetails,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating profile",
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const userDetails = User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await deleteResourceFromCloudinary(userDetails.image);

    const userEnrolledCoursesId = userDetails?.courses;

    for (const courseId of userEnrolledCoursesId) {
      await Course.findByIdAndUpdate(courseId, {
        $pull: { studentsEnrolled: userId },
      });
    }

    await Profile.findByIdAndDelete(userDetails.additionalDetails);
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting profile",
    });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();
    res.status(200).json({
      success: true,
      data: userDetails,
      message: "User data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching user details",
    });
  }
};

export const updateUserProfileImage = async (req: Request, res: Response) => {
  try {
    const profileImage = req.files?.profileImage;
    const userId = req.user?.id;
    const image = await uploadImageToCloudinary(
      profileImage,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updatedUserDetails = await User.findByIdAndUpdate(
      userId,
      { image: image?.secure_url },
      { new: true }
    ).populate({
      path: "additionalDetails",
    });

    res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      data: updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating user profile image",
    });
  }
};

export const getEnrolledCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();

    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );

        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }

      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });

      courseProgressCount = courseProgressCount?.completedVideos.length;

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const instructorDashboard = async (req: Request, res: Response) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({
      courses: courseData,
      message: "Instructor Dashboard Data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const allStudentsDetails = await User.find({
      accountType: "Student",
    })
      .populate("additionalDetails")
      .populate("courses")
      .sort({ createdAt: -1 });

    const studentsCount = await User.countDocuments({
      accountType: "Student",
    });

    res.status(200).json({
      allStudentsDetails,
      studentsCount,
      message: "All Students Data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while fetching all students",
      error: error.message,
    });
  }
};

export const getAllInstructors = async (req: Request, res: Response) => {
  try {
    const allInstructorsDetails = await User.find({
      accountType: "Instructor",
    })
      .populate("additionalDetails")
      .populate("courses")
      .sort({ createdAt: -1 });

    const instructorsCount = await User.countDocuments({
      accountType: "Instructor",
    });

    res.status(200).json({
      allInstructorsDetails,
      instructorsCount,
      message: "All Instructors Data fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while fetching all Instructors",
      error: error.message,
    });
  }
};
