import { NextFunction, Request, Response } from "express";
import { Developer, DeveloperResult } from "../interfaces/developer.interface";
import { client } from "../database/database";
import AppError from "../errors/App.error";

export const isIdValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: DeveloperResult = await client.query(
    `SELECT * FROM "developers" WHERE "id" = $1`,
    [id]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found", 404);
  }

  const foundedDeveloper: Developer = queryResult.rows[0];

  res.locals = { ...res.locals, foundedDeveloper };

  return next();
};
