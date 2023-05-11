import express, { Request, Response } from "express";
import http from "http";
import middlewaresAppConfig from "app-config/middlewares";
import routes from "@routes/index";
import dotenv from "dotenv";
import logging from "app-config/logging";
import database from "app-config/database";

const app = express();

dotenv.config();
logging();
database();

// Middlewares are imported here.
middlewaresAppConfig(app);

app.get("/", (_request: Request, response: Response) => {
  const target = "Passando cara número 2";
  response.send(`Hello ${target}!`);
});

app.use(express.static(__dirname, { dotfiles: "allow" }));

// Add app routes.
routes(app);

const server = new http.Server(app);
server.listen(process.env.PORT || 8080);
