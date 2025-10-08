import { QueryResult } from "pg";

export type Project = {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate: Date;
  developerId: number;
};

export type CreateProject = Omit<Project, "id">;
export type ProjectResult = QueryResult<Project>;
export type ProjectRead = Project[];
export type ProjectUpdate = Partial<Project>;
