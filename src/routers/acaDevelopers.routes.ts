import { Router } from "express";
import {
  createDeveloperController,
  deleteDeveloperController,
  readDeveloperByIDController,
  readDeveloperController,
  updateDeveloperController,
} from "../controllers/developer.controller";
import { emailExists } from "../middlewares/emailExists.middleware";
import { isIdValid } from "../middlewares/isIDValid.middleware";
import { createDeveloperInfosController } from "../controllers/developerInfos.controller";
import { developerInfosValid } from "../middlewares/developerInfosValid.middleware";

export const developerRouter = Router();

developerRouter.post("/", emailExists, createDeveloperController);
developerRouter.get("/", readDeveloperController);
developerRouter.use("/:id", isIdValid);
developerRouter.post("/:id/infos", developerInfosValid, createDeveloperInfosController);
developerRouter.get("/:id", readDeveloperByIDController);
developerRouter.patch("/:id", emailExists, updateDeveloperController);
developerRouter.delete("/:id", deleteDeveloperController);
