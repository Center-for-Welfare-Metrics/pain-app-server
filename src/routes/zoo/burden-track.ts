import { Router } from "express";
import { TrackModel } from "@models/episode structure/track";
import * as burdenTrackController from "@controllers/zoo/burden-track";
import { generateEndpoints, methods } from "@generators/crud-endpoints";
import { verifyToken } from "@middlewares/authentication";

const router = Router();

router.all("/*", verifyToken());

generateEndpoints(router, TrackModel, [
  {
    method: methods.GET,
  },
  {
    method: methods.GET_BY_ID,
  },
]);

router.post("/", burdenTrackController.create);

router.put("/:track_id/:episode_id", burdenTrackController.updateById);

router.delete("/:track_id/:episode_id", burdenTrackController.deleteBurden);

export default router;
