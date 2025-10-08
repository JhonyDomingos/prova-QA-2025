import { Request, Response } from "express";
import {
  createDeveloperService,
  deleteDeveloperService,
  readDeveloperByIDService,
  readDeveloperService,
  updateDeveloperService,
} from "../services/developer.service";
import { Developer, DeveloperRead } from "../interfaces/developer.interface";

export const createDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Developer = await createDeveloperService(req.body);
  return res.status(201).json(developer);
};

export const readDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: DeveloperRead = await readDeveloperService();
  return res.status(200).json(developer);
};

export const readDeveloperByIDController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Developer = await readDeveloperByIDService(req.params.id);
  return res.status(200).json(developer);
};

export const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Developer = await updateDeveloperService(
    req.params.id,
    req.body
  );
  return res.status(200).json(developer);
};

export const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDeveloperService(req.params.id);
  return res.status(204).json();
};
