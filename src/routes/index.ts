import { Express } from "express";
import authRouter from "@routes/services/auth";
import prompt from "@routes/services/prompt";

const routes = (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/prompt", prompt);
};

export default routes;
