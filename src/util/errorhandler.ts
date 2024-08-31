import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  status?: number;
}

// Centralized error handling middleware
const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default status code and message
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Send error response
  res.status(statusCode).json({
    error: message
  });
};

export default errorHandler;
