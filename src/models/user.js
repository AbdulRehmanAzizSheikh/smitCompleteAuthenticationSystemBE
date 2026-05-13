import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      min: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    verify: {
      status: {
        type: Boolean,
        default: false,
      },
      otp: {
        type: Number,
      },
      expiresAt: {
        type: Date,
      },
    },
    forgetPassword: {
      otp: {
        type: Number,
      },
      expiresAt: {
        type: Date,
      },
      token: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
