import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import { UpdateSegmentValidator } from "@useCases/segmentUseCases/updateSegmentUseCase/updateSegementController";

import { CreateJustificationController } from "@useCases/segmentJustificationUseCases/createSegmentJustificationUseCase/createSegmentJustificationController";
import { UpdateSegmentJustificationController } from "@useCases/segmentJustificationUseCases/updateSegmentJustificationUseCase/updateSegmentJustificationController";
import { DeleteSegmentJustificationController } from "@useCases/segmentJustificationUseCases/deleteSegmentJustificationUseCase/deleteSegmentJustificationController";
import { ListSegmentJustificationController } from "@useCases/segmentJustificationUseCases/listSegmentJustificationUseCase/listSegmentJustificationController";

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
  // UpdateSegmentValidator(),
  // validate,
  UpdateSegmentJustificationController
);

router.delete(
  "/:justification_id",
  // DeleteSegmentValidator(),
  // validate,
  DeleteSegmentJustificationController
);

router.get(
  "/:segment_id",
  // DeleteSegmentValidator(),
  // validate,
  ListSegmentJustificationController
);

export default router;
