import { Request, Response } from "express";
import { DeveloperInfos, DeveloperInfosCreate } from "../interfaces/developerInfo.interface";
import { createDeveloperInfosService } from "../services/developerInfos.service";

export const createDeveloperInfosController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const data:DeveloperInfosCreate = {
        ...req.body, 
        developerId: req.params.id
    }

    
    const DeveloperInfos: DeveloperInfos = await createDeveloperInfosService(data);
    return res.status(201).json(DeveloperInfos);
  };