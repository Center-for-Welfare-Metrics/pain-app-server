import express, { Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";
import routes from "@routes/index";
import middlewaresAppConfig from "@app-config/middlewares";
import logging from "@app-config/logging";
import database from "@app-config/database";

const app = express();

dotenv.config();
logging();
database();

// Middlewares are imported here.
middlewaresAppConfig(app);

app.get("/", (_request: Request, response: Response) => {
  response.send(`Hello Word! HEHEHEHE`);
});

app.use(express.static(__dirname, { dotfiles: "allow" }));

// Add app routes.
routes(app);

const server = new http.Server(app);
server.listen(process.env.PORT);
