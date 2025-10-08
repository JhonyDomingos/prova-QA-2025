import { Router } from "express";
import {
  createProjectController,
  readProjectByIDController,
  updateProjectController,
} from "../controllers/project.controller";
import {
  isDeveloperIdValid,
  isProjectIdValid,
} from "../middlewares/verifyProjectsID.middleware";

export const projectRouter = Router();

projectRouter.post("/", isDeveloperIdValid, createProjectController);
projectRouter.use("/:id", isProjectIdValid);
projectRouter.get("/:id", readProjectByIDController);
projectRouter.patch("/:id", isDeveloperIdValid, updateProjectController);
