import bcrypt from "bcryptjs";
const users =[]
export const login= (req, res) => {
  const { username, password } = req.body;
const hashedpassword = await bcrypt.hash(password, 10);
  users.push({
    username,
    password: hashedpassword,
  });
  res.send("user registered");}
