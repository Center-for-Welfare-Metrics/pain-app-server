import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";

import { CreateJustificationController } from "@useCases/segmentJustificationUseCases/createSegmentJustificationUseCase/createSegmentJustificationController";
import { UpdateSegmentJustificationController } from "@useCases/segmentJustificationUseCases/updateSegmentJustificationUseCase/updateSegmentJustificationController";
import { DeleteSegmentJustificationController } from "@useCases/segmentJustificationUseCases/deleteSegmentJustificationUseCase/deleteSegmentJustificationController";
import { ListSegmentJustificationController } from "@useCases/segmentJustificationUseCases/listSegmentJustificationUseCase/listSegmentJustificationController";
import { UpdateSegmentGuestValidator } from "@useCases/segmentUseCases/guestUseCases/updateSegmentGuestUseCase/updateSegementGuestController";
import { UpdateSegmentJustificationValidatorGuest } from "@useCases/segmentJustificationUseCases/guestUseCases/updateSegmentJustificationUseCase/updateSegmentJustificationController";

const router = Router();

router.post(
  "/:segment_id",
  UpdateSegmentGuestValidator(),
  validate,
  CreateJustificationController
);

router.patch(
  "/:justification_id",
  UpdateSegmentJustificationValidatorGuest(),
  validate,
  UpdateSegmentJustificationController
);

router.delete(
  "/:justification_id",
  UpdateSegmentJustificationValidatorGuest(),
  validate,
  DeleteSegmentJustificationController
);

router.get(
  "/:segment_id",
  UpdateSegmentGuestValidator(),
  validate,
  ListSegmentJustificationController
);

export default router;
