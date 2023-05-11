import { Router } from "express";
import { SegmentModel } from "@models/episode structure/segment";
import * as burdenSegmentController from "@controllers/zoo/burden-segment";
import { verifyToken } from "@middlewares/authentication";
import { generateEndpoints, methods } from "@generators/crud-endpoints";

const router = Router();

router.all("/*", verifyToken());

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

router.post("/", burdenSegmentController.createSegment);

router.put("/:id/:episode_id/:track_id", burdenSegmentController.updateSegment);

router.delete(
  "/:id/:episode_id/:track_id",
  burdenSegmentController.deleteSegment
);

export default router;
