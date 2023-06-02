import { Express } from "express";
import authRouter from "@routes/services/auth";
import prompt from "@routes/services/prompt";
import account from "@routes/services/account";

const routes = (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/prompt", prompt);
  app.use("/account", account);
};

export default routes;
