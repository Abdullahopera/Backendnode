import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }
  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(201).json({ token, user: { id: user._id, name, email } });
});
