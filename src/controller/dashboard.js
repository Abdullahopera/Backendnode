import jwt from "jsonwebtoken";

export const dashboard = (req, res) => {
  try {
    const token = req.header("auth");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode.username) {
      res.send(`welcome ${decode.username}`);
    }
  } catch {
    res.status(401).send("error");
  }
};
