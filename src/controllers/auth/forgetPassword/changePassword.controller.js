import User from "../../../models/User.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../../../utils/jwt/index.js";

const changePassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await User.findById(decodedToken.payload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.forgetPassword = {
      otp: null,
      expiresAt: null,
      token: null,
    };
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default changePassword;
