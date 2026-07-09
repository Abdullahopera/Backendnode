import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("error");
  }
  const token = jwt.sign({ username }, "token123");
  res.json({ token });
};
