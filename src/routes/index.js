import { Router } from "express";
import { register } from "../controller/user.js";
import { login } from "../controller/auth.js";
import { getProduct } from "../controller/product.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/product", getProduct);

export default router;
