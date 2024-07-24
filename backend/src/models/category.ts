import mongoose, { Schema, Document } from "mongoose";

// Define interface for Category document (optional but recommended)
interface ICategory extends Document {
  name: string;
  description?: string;
  courses: mongoose.Types.ObjectId[]; // Assuming ICourse is the interface for Course document
}

// Define mongoose schema
const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true, // Name of the category is required
  },
  description: {
    type: String,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course", // Array of references to Course model
    },
  ],
});

// Define and export mongoose model
export const Category = mongoose.model<ICategory>("Category", categorySchema);
