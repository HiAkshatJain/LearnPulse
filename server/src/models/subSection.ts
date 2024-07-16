import mongoose, { Document } from "mongoose";

// Define an interface representing the structure of a SubSection document
interface SubSectionDocument extends Document {
  title?: string;
  timeDuration?: string;
  description?: string;
  videoUrl?: string;
}

// Define a Mongoose schema for SubSection documents
const subSectionSchema = new mongoose.Schema({
  title: {
    type: String, // Field type: String
  },
  timeDuration: {
    type: String, // Field type: String
  },
  description: {
    type: String, // Field type: String
  },
  videoUrl: {
    type: String, // Field type: String
  },
});

// Define and export the SubSection model using the schema
export const SubSection = mongoose.model<SubSectionDocument>(
  "SubSection", // Mongoose model name
  subSectionSchema // Mongoose schema to be used for the model
);
