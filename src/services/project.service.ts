import format from "pg-format";
import { client } from "../database/database";
import {
  CreateProject,
  Project,
  ProjectResult,
  ProjectUpdate,
} from "../interfaces/project.interface";

export const createProjectsService = async (
  data: CreateProject
): Promise<Project> => {
  const queryFormat: string = format(
    `INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );
  const queryResult: ProjectResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

export const readProjectsByIDService = async (id: string): Promise<Project> => {
  const query: string = `SELECT
    "p"."id" AS "projectId",
    "p"."name" AS "projectName",
    "p"."description" AS "projectDescription",
    "p"."repository" AS "projectRepository",
    "p"."startDate" AS "projectStartDate",
    "p"."endDate" AS "projectEndDate",
    "d"."name" AS"projectDeveloperName"
    FROM "projects" AS "p"
    LEFT JOIN "developers" AS "d"
      ON "p"."developerId" = "d"."id"
    WHERE "p"."id" = $1;     
    
    `;

  const QueryResult: ProjectResult = await client.query(query, [id]);

  return QueryResult.rows[0];
};

export const updateProductsService = async (
  id: string,
  data: ProjectUpdate
): Promise<Project> => {
  const queryFormat: string = format(
    `UPDATE "projects" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: ProjectResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};
