import ApiError from "../utils/ApiError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(400, message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || "value";
  return new ApiError(400, `Duplicate field ${value}`);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new ApiError(400, `Invalid input: ${errors.join(". ")}`);
};

const handleJWTError = () => new ApiError(401, "Invalid token");
const handleJWTExpired = () => new ApiError(401, "Token expired");

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    console.error("ERROR:", err);
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  let error = { ...err, message: err.message };

  if (err.name === "CastError") error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") error = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpired();

  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
