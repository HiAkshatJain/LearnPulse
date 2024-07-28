import { Dispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";

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

export function updateProfile(token: string, formData: any) {
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector({
        method: "PUT",
        url: UPDATE_PROFILE_API,
        bodyData: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data?.updatedUserDetails?.image
        ? response.data.updatedUserDetails?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...response.data.updatedUserDetails,
          image: userImage,
        })
      );
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export function changePassword(token: string, formData: any) {
  return async () => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector({
        method: "POST",
        url: CHANGE_PASSWORD_API,
        bodyData: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Changed Successfully");
    } catch (error) {
      toast.error("Error Occursed in updating password");
    }
    toast.dismiss(toastId);
  };
}

export function deleteProfile(token: string, navigate: any) {
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector({
        method: "DELETE",
        url: DELETE_PROFILE_API,

        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Deleted Successfully"); //@ts-ignore
      dispatch(logout(navigate));
    } catch (error) {
      toast.error("Could Not Delete Profile");
    }
    toast.dismiss(toastId);
  };
}
