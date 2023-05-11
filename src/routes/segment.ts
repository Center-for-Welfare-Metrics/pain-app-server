import { Router } from "express";
import { SegmentModel } from "@models/episode structure/segment";
import * as segmentController from "@controllers/segment";
import { generateEndpoints, methods } from "@generators/crud-endpoints";

const router = Router();

router.all("/*");

generateEndpoints(router, SegmentModel, [
  {
    method: methods.GET,
    config: {
      populateFields: [
        "units",
        "acute_or_chronic",
        "pain_texture",
        "pain_depth",
      ],
    },
  },
  {
    method: methods.GET_BY_ID,
    config: {
      populateFields: [
        "units",
        "acute_or_chronic",
        "pain_texture",
        "pain_depth",
      ],
    },
  },
]);

router.post("/", segmentController.createSegment);

router.put("/:id/:episode_id/:track_id", segmentController.updateSegment);

router.delete("/:id/:episode_id/:track_id", segmentController.deleteSegment);

export default router;
