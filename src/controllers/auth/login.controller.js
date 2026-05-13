import User from "../../models/User.js";
import { generateToken } from "../../utils/jwt/index.js";
import bcrypt from "bcrypt";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.verify.status) {
      return res.status(401).json({ message: "Email not verified" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await generateToken({ id: user._id }, "1h");
    return res
      .status(200)
      .cookie("token", token)
      .json({
        message: "Login successful",
        user: { _id: user._id, username: user.username, email: user.email },
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default loginController;
