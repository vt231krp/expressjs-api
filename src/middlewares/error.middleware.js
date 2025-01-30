import { ApiError } from "../utils/api-error.js";

export function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    res
      .status(err.status || 500)
      .json({ message: err.message, success: false });
  }

  console.error(err);
  res.status(500).json({ message: "Internal Server Error", status: false });
}
