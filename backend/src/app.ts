import express from "express";

import { config } from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import cors from "cors";
import { connectDB } from "./config/database.js";
import { cloudinaryConnect } from "./config/cloudinary.js";

import userRoutes from "./routes/user.js";

config({
  path: "./.env",
});

const port = process.env.PORT!;
const url = process.env.DATABASE_URL!;
const cloud_name = process.env.CLOUD_NAME!;
const key = process.env.API_KEY!;
const secret = process.env.API_SECRET!;

const app = express();

connectDB(url);
cloudinaryConnect(cloud_name, key, secret);

app.use(express.json());
app.use(cookieParser());

//Cors for development
app.use(
  cors({
    // origin: 'http://localhost:5173', // frontend link
    origin: "*",
    credentials: true,
  })
);

//Corse from Production
// app.use(
//   cors({
//     origin: [process.env.CLIENT_URL!],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/v1/auth", userRoutes);

app.get("/", (req, res) => {
  res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
});

app.listen(port, () => {
  console.log(`Express is working on http://localhost:${port}`);
});
