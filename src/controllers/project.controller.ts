import { Request, Response } from "express";
import { Project } from "../interfaces/project.interface";
import { createProjectsService, readProjectsByIDService, updateProductsService } from "../services/project.service";

export const createProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Project: Project = await createProjectsService(req.body);
  return res.status(201).json(Project);
};

export const readProjectByIDController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Project: Project = await readProjectsByIDService(req.params.id);
  return res.status(200).json(Project);
};

export const updateProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Project: Project = await updateProductsService(
    req.params.id,
    req.body
  );
  return res.status(200).json(Project);
};
