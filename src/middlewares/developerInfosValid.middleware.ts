import { NextFunction, Request, Response } from "express";
import { client } from "../database/database";
import {
  DeveloperInfosResult,
  validOs,
} from "../interfaces/developerInfo.interface";
import AppError from "../errors/App.error";

export const developerInfosValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body) return next();

  const { developerSince, preferredOS } = req.body;

  if (!validOs.includes(preferredOS)) {
    throw new AppError("Invalid OS option.", 400);
  }

  const query: string =
    'SELECT * FROM "developerInfos" WHERE "developerSince" = $1 AND "preferredOS" = $2;';
  const queryResult: DeveloperInfosResult = await client.query(query, [
    developerSince,
    preferredOS,
  ]);

  if (queryResult.rowCount) {
    throw new AppError("Developer Infos already exists", 409);
  }

  return next();
};
