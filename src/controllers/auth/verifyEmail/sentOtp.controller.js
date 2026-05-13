import User from "../../../models/user.js";
import sendEmail from "../../../utils/email/sendEmail.js";
import otpEmailTemplate from "../../../utils/email/templates/otpEmailTemplate.js";

const sentOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.verify.otp = otp;
    user.verify.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    const emailBody = otpEmailTemplate(otp);
    await sendEmail(email, "OTP Verification", emailBody);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default sentOtp;
