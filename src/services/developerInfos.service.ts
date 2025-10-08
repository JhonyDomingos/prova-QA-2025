import format from "pg-format";
import {
  DeveloperInfos,
  DeveloperInfosCreate,
  DeveloperInfosResult,
} from "../interfaces/developerInfo.interface";
import { client } from "../database/database";

export const createDeveloperInfosService = async (
  data: DeveloperInfosCreate
): Promise<DeveloperInfos> => {
  const queryFormat: string = format(
    `INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );


  const queryResult: DeveloperInfosResult = await client.query(queryFormat);

  return queryResult.rows[0];
};
