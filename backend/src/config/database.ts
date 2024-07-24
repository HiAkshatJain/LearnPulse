import mongoose from "mongoose";

// Function to connect to MongoDB database using Mongoose
export const connectDB = (url: string) => {
  mongoose
    .connect(url || "", {
      dbName: "LearnPulse", // Specify the database name
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch(() => console.log("Error while connecting server with Database"));
};
