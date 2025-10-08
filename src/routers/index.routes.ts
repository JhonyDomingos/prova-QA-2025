import { Router } from "express";
import { developerRouter } from "./acaDevelopers.routes";
import { projectRouter } from "./projects.routes";

export const routes: Router = Router()

routes.use("/developers", developerRouter)
routes.use("/projects", projectRouter)
