import { Express } from "express";
import authRouter from "@routes/services/auth";
import prompt from "@routes/services/prompt";
import account from "@routes/services/account";
import patient from "@routes/services/patient";
import episode from "@routes/services/episode";
import publicRoutes from "@routes/services/public";

const routes = (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/prompt", prompt);
  app.use("/account", account);
  app.use("/patient", patient);
  app.use("/episode", episode);
  app.use("/public", publicRoutes);
};

export default routes;
