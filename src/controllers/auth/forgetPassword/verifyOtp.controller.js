import User from "../../../models/User.js";
import { generateToken } from "../../../utils/jwt/index.js";

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.forgetPassword.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.forgetPassword.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    const token = await generateToken({ id: user._id }, "10m");
    user.forgetPassword.otp = null;
    user.forgetPassword.expiresAt = null;
    user.forgetPassword.token = token;
    await user.save();
    return res.status(200).json({
      message: "Email verified successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default verifyOtp;
