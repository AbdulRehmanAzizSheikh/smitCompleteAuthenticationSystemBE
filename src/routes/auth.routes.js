import express from "express";
import registerController from "../controllers/auth/register.controller.js";
import sentOtp from "../controllers/auth/verifyEmail/sentOtp.controller.js";
import verifyOtp from "../controllers/auth/verifyEmail/verifyOtp.controller.js";
import loginController from "../controllers/auth/login.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/sent-otp", sentOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginController);

export default router;
