import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
  CREATE_NEW_CATEGORY,
  DELETE_CATEGORY,
} = courseEndpoints;

export const createNewCategory = async function (
  name: string,
  description: string,
  token: string
) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: CREATE_NEW_CATEGORY,
      bodyData: { name, description },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      console.log("Could Not create new category");
    }

    toast.success("New Category Created !");
  } catch (error) {
    toast.error("Category not created");
  }
  toast.dismiss(toastId);
};

export const deleteCategory = async (categoryId: string, token: string) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector({
      method: "DELETE",
      url: DELETE_CATEGORY,
      bodyData: { categoryId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      console.log("Could Not delete category");
    }

    toast.success("Category Deleted !");
  } catch (error) {
    toast.error("Error in deleting course");
  }
  toast.dismiss(toastId);
};

export const fetchCourseCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector({
      method: "GET",
      url: COURSE_CATEGORIES_API,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error("Error in fetching course category");
  }
  return result;
};
