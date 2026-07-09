import { Router } from "express";
import { register } from "../controller/user.js";
import { login } from "../controller/auth.js";
import { dashboard } from "../controller/dashboard.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/dashboard", protect, dashboard);
router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", protect, createProduct);
router.put("/products/:id", protect, updateProduct);
router.delete("/products/:id", protect, authorize("admin"), deleteProduct);

export default router;
