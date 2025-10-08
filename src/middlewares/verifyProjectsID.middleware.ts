import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.error";
import { Project, ProjectResult } from "../interfaces/project.interface";
import { client } from "../database/database";
import { Developer, DeveloperResult } from "../interfaces/developer.interface";

export const isProjectIdValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: ProjectResult = await client.query(
    `SELECT * FROM "projects" WHERE "id" = $1`,
    [id]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Project not found", 404);
  }

  const foundedProject: Project = queryResult.rows[0];

  res.locals = { ...res.locals, foundedProject };

  return next();
};

export const isDeveloperIdValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.body;

  if (!developerId) {
    throw new AppError("DeveloperId not provided in request body", 400);
  }

  const queryResult: DeveloperResult = await client.query(
    `SELECT * FROM "developers" WHERE "id" = $1`,
    [developerId]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found", 404);
  }

  const foundedDeveloper: Developer = queryResult.rows[0];

  res.locals = { ...res.locals, foundedDeveloper };

  return next();
};
