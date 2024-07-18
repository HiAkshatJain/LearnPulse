import mongoose, { Document, Schema, Types } from "mongoose";

// Define interface for Section document
interface SectionDocument extends Document {
  sectionName?: string;
  subSection?: Types.ObjectId[]; // Array of ObjectIds referencing SubSection documents
}

// Define mongoose schema for Section
const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String, // Field type: String
    required: true, // Field is required
  },
  subSection: [
    {
      type: Schema.Types.ObjectId, // Field type: ObjectId
      ref: "SubSection", // Reference to SubSection model
      required: true, // Field is required
    },
  ],
});

// Define and export Section model
export const Section = mongoose.model<SectionDocument>(
  "Section",
  sectionSchema
);
