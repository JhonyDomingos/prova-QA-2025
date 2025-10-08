import { NextFunction, Request, Response } from "express";

export default class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log(error);

  return res.status(500).json({ message: "Internal server Error." });
};
