import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Profile document
interface IProfile extends Document {
  gender?: string;
  dateOfBirth?: string;
  about?: string;
  contactNumber?: number;
}

// Define the schema for the profile collection
const profileSchema = new mongoose.Schema({
  gender: {
    type: String, // Type: String
  },
  dateOfBirth: {
    type: String, // Type: String
  },
  about: {
    type: String, // Type: String
    trim: true, // Trim leading and trailing whitespace
  },
  contactNumber: {
    type: Number, // Type: Number
    trim: true, // This is not necessary for numbers, just noting
  },
});

// Create and export the Profile model based on profileSchema
export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
