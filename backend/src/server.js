import app from "./app.js";
import "dotenv/config";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
  server.close(() => process.exit(1));
});
