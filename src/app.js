import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import User from "./models/user.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
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
