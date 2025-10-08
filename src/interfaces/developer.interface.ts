import { QueryResult } from "pg";

export type Developer = {
  id: number;
  name: string;
  email: string;
};

export type CreateDeveloper = Omit<Developer, "id">;
export type DeveloperResult = QueryResult<Developer>;
export type DeveloperRead = Developer[];
export type DeveloperUpdate = Partial<Developer>;
