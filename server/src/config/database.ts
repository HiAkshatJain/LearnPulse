import mongoose from "mongoose";

export const connectDB = (url: string) => {
  mongoose
    .connect(url || "", {
      dbName: "LearnePulse",
    })
    .then(() => console.log("Database Connected Sucessfully"))
    .catch(() => console.log("Error while connecting server with Database"));
};
