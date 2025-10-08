import 'express-async-errors'
import express, { Application } from "express";
import { handleErrors } from "./errors/App.error";
import { routes } from "./routers/index.routes";

const app: Application = express();

app.use(express.json())

app.use("/", routes)

app.use(handleErrors)

export default app;
