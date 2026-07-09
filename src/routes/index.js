import { Router } from "express";
import { register } from "../../controller/user.js";
import { login } from "../../controller/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
