import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import User from "./models/User.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import Upload from "./models/Upload.js";
import multer, { diskStorage } from "multer";
import path from "path";
import cloudinary from "./config/cloudinary.js";
dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 250,
  message: "Too many requests from this IP, please try again after 5 minutes",
});

app.use(limiter);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "src/uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, `\({Date.now()}-\){file.originalname}`);
  },
});

const upload = multer({ storage });
app.post("/api/upload-file", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    console.log("file", file);

    if (!file) {
      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }

    const cloudResponse = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
    });

    const upload = await Upload.create({
      file: cloudResponse.secure_url,
    });

    res.status(201).json({
      status: true,
      message: "File uploaded successfully",
      upload,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
});

app.use("/api/auth", authRoutes);

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default app;
