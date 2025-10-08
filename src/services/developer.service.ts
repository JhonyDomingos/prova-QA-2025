import format from "pg-format";
import {
  CreateDeveloper,
  Developer,
  DeveloperRead,
  DeveloperResult,
  DeveloperUpdate,
} from "../interfaces/developer.interface";
import { client } from "../database/database";


export const createDeveloperService = async (
  data: CreateDeveloper
): Promise<Developer> => {
  const queryFormat: string = format(
    `INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );
  const queryResult: DeveloperResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

export const readDeveloperService = async (): Promise<DeveloperRead> => {
  const query: string = `SELECT * FROM "developers";`;

  const QueryResult: DeveloperResult = await client.query(query);

  return QueryResult.rows;
};

export const readDeveloperByIDService = async (
  id: string
): Promise<Developer> => {
  const query: string = `SELECT
    "d"."id" AS "developerId",
    "d"."name" AS "developerName",
    "d"."email" AS "developerEmail",
    "di"."developerSince" AS "developerInfoDeveloperSince",
    "di"."preferredOS" AS "developerInfoPreferredOS"
    FROM "developers" AS "d"
    LEFT JOIN "developerInfos" AS "di"
      ON "di"."developerId" = "d"."id"
    WHERE "d"."id" = $1;
    
  
  `;

  const QueryResult: DeveloperResult = await client.query(query, [id]);

  return QueryResult.rows[0];
};

export const updateDeveloperService = async (
  id: string,
  data: DeveloperUpdate
): Promise<Developer> => {
  const queryFormat: string = format(
    `UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};

export const deleteDeveloperService = async (id: string): Promise<void> => {
  const query = `DELETE FROM "developers" WHERE "id" = $1;`;

  await client.query(query, [id]);
};
