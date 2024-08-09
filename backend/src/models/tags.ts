import mongoose, { Document } from "mongoose";

// Define the interface for the Profile document
interface ITags extends Document {
  name?: string;
  description: string;
  course?: mongoose.Types.ObjectId[];
}

// Define the schema for the profile collection
const tagsSchema = new mongoose.Schema({
  name: {
    type: String, // Type: String
  },
  description: {
    type: String, // Type: String
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

// Create and export the Profile model based on profileSchema
export const Tags = mongoose.model<ITags>("Tags", tagsSchema);
