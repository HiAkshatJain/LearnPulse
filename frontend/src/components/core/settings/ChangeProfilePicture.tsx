//@ts-nocheck
import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import { updateUserProfileImage } from "../../../services/operations/settingsAPI";

const ChangeProfilePicture = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      setProfileImage(file);
      previewFile(file);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      dispatch(updateUserProfileImage(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (profileImage) {
      previewFile(profileImage);
    }
  }, [profileImage]);

  return (
    <Card className="w-full mb-7">
      <CardHeader className="flex items-center justify-between rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12">
        <div className="flex gap-10">
          <Image
            alt={`profile-${user?.firstName}`}
            height={70}
            radius="sm"
            src={user?.image}
            width={70}
            className=""
          />
          <div className="flex flex-col justify-center">
            <p className="text-lg font-semibold text-richblack-5 capitalize">
              Change Profile Picture
            </p>
            <div className="space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
              <Button onClick={handleClick} disabled={loading} color="default">
                Select
              </Button>
              <Button color="warning" onClick={handleFileUpload}>
                {loading ? "Uploading..." : "Upload"} <FiUpload />{" "}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ChangeProfilePicture;
