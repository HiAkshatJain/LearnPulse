import { apiConnector } from "../apiConnector";
import { adminEndPoints } from "./../apis";
const { GET_ALL_STUDENTS_DATA_API, GET_ALL_INSTRUCTORS_DATA_API } =
  adminEndPoints;

export async function getAllStudentsData(token: string) {
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ALL_STUDENTS_DATA_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    result = response?.data;

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {}
  return result;
}

export async function getAllInstructorDetails(token: string) {
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ALL_INSTRUCTORS_DATA_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    result = response?.data;

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {}
  return result;
}
