import { Express } from "express";
import authRouter from "@routes/services/auth";
import prompt from "@routes/services/prompt";
import account from "@routes/services/account";
import patient from "@routes/services/patient";
import episode from "@routes/services/episode";
import publicRoutes from "@routes/services/public";
import segment from "@routes/services/segment";
import track from "@routes/services/track";
import episodeGuest from "@routes/services/guest/episode-guest";
import trackGuest from "@routes/services/guest/track-guest";
import segmentGuest from "@routes/services/guest/segment-guest";
import segmentJustification from "@routes/services/segment-justification";
import segmentJustificationGuest from "@routes/services/guest/segment-justification";

const routes = (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/prompt", prompt);
  app.use("/account", account);
  app.use("/patient", patient);
  app.use("/episode", episode);
  app.use("/episode-guest", episodeGuest);
  app.use("/public", publicRoutes);
  app.use("/track", track);
  app.use("/track-guest", trackGuest);
  app.use("/segment", segment);
  app.use("/segment-guest", segmentGuest);
  app.use("/segment-justification", segmentJustification);
  app.use("/segment-justification-guest", segmentJustificationGuest);
};

export default routes;
