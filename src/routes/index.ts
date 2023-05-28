import { Express } from "express";
import authRouter from "@routes/services/auth";

const routes = (app: Express) => {
  app.use("/auth", authRouter);
};

export default routes;
