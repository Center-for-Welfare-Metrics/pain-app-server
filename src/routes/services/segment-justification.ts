import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import { UpdateSegmentValidator } from "@useCases/segmentUseCases/updateSegmentUseCase/updateSegementController";

import { CreateJustificationController } from "@useCases/segmentJustificationUseCases/createSegmentJustificationUseCase/createSegmentJustificationController";
import {
  UpdateSegmentJustificationController,
  UpdateSegmentJustificationValidator,
} from "@useCases/segmentJustificationUseCases/updateSegmentJustificationUseCase/updateSegmentJustificationController";
import { DeleteSegmentJustificationController } from "@useCases/segmentJustificationUseCases/deleteSegmentJustificationUseCase/deleteSegmentJustificationController";
import {
  ListSegmentJustificationController,
  ListSegmentJustificationValidator,
} from "@useCases/segmentJustificationUseCases/listSegmentJustificationUseCase/listSegmentJustificationController";

const router = Router();

router.use(useAuth);

router.post(
  "/:segment_id",
  UpdateSegmentValidator(),
  validate,
  CreateJustificationController
);

router.patch(
  "/:justification_id",
  UpdateSegmentJustificationValidator(),
  validate,
  UpdateSegmentJustificationController
);

router.delete(
  "/:justification_id",
  UpdateSegmentJustificationValidator(),
  validate,
  DeleteSegmentJustificationController
);

router.get(
  "/:segment_id",
  ListSegmentJustificationValidator(),
  validate,
  ListSegmentJustificationController
);

export default router;
