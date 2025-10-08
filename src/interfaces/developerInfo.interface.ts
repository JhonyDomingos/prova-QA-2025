import { QueryResult } from "pg";

export type DeveloperInfos = {
  id: number;
  developerSince: Date | string;
  preferredOS: "Windows" | "Linux"| "MacOS"
  developerId: number;
};

export type DeveloperInfosCreate = Omit<DeveloperInfos, "id">
export type DeveloperInfosResult = QueryResult<DeveloperInfos>

export const validOs: DeveloperInfos['preferredOS'][] = ["Windows", "Linux", "MacOS"];