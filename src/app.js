import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import User from "./models/User.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
  const users = await User.find({});
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
});

export default app;
