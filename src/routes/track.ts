import { Router } from "express";
import { TrackModel } from "@models/episode structure/track";
import * as trackController from "@controllers/track";
import { generateEndpoints, methods } from "@generators/crud-endpoints";

const router = Router();

router.all("/*");

generateEndpoints(router, TrackModel, [
  {
    method: methods.GET_BY_ID,
  },
]);

router.get("/", trackController.list);

router.post("/", trackController.create);

router.put("/:track_id/:episode_id", trackController.updateById);

router.delete("/:track_id/:episode_id", trackController.deleteTrack);

export default router;
