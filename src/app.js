import express from "express";
import helmet from "helmet";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();
// ── Security Middleware ─────────────────────
app.use(helmet()); // Sets security HTTP headers
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// ── Rate Limiting ───────────────────────────
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per IP per window
    message: "Too many requests, please try again later",
  }),
);

// ── Body Parsing ────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ─────────────────────────────────
app.use(morgan("dev")); // Logs: GET /api/users 200 12ms

// ── Routes ──────────────────────────────────
app.use("/api", routes);

// ── Health Check ────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Global Error Handler (MUST be last) ─────
app.use(errorHandler);
app.get("/", (req, res) => {
  console.log("hello world");
});
export default app;
