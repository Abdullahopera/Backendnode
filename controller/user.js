import bcrypt from "bcryptjs";
import User from "../src/models/user.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
