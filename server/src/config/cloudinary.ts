import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config({
  path: "../././.env",
});

export const cloudinaryConnect = (
  name: string,
  key: string,
  secret: string
) => {
  try {
    cloudinary.config({
      cloud_name: name,
      api_key: key,
      api_secret: secret,
    });
    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.log("Cloudinary connection failed");
  }
};
