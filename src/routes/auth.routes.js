import express from "express";
import registerController from "../controllers/auth/register.controller.js";
import sentOtp from "../controllers/auth/verifyEmail/sentOtp.controller.js";
import verifyOtp from "../controllers/auth/verifyEmail/verifyOtp.controller.js";
import loginController from "../controllers/auth/login.controller.js";
import sentOtpChangePassword from "../controllers/auth/forgetPassword/sendOtp.controller.js";
import verifyOtpChangePassword from "../controllers/auth/forgetPassword/verifyOtp.controller.js";
import changePassword from "../controllers/auth/forgetPassword/changePassword.controller.js";
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after 1 minute",
});

const router = express.Router();
router.use(authLimiter);
router.post("/register", registerController);
router.post("/sent-otp", sentOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginController);
router.post("/forget-password/send-otp", sentOtpChangePassword);
router.post("/forget-password/verify-otp", verifyOtpChangePassword);
router.post("/forget-password/change-password", changePassword);

export default router;
