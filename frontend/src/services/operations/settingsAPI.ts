import { Dispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateUserProfileImage(token: string, formData: any) {
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector({
        method: "PUT",
        url: UPDATE_DISPLAY_PICTURE_API,
        bodyData: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));

      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      toast.error("Could Not Update Profile Picture");
    }
    toast.dismiss(toastId);
  };
}
