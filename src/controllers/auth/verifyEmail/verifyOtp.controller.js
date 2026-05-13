import User from "../../../models/user.js";

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.verify.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.verify.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    user.verify.status = true;
    user.verify.otp = null;
    user.verify.expiresAt = null;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyOtp;
