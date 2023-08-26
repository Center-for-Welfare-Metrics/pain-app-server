import {
  CreateSegmentGuestController,
  CreateSegmentGuestValidator,
} from "@useCases/segmentUseCases/guestUseCases/createSegmentGuestUseCase/createSegmentGuestController";
import {
  DeleteSegmentGuestController,
  DeleteSegmentGuestValidator,
} from "@useCases/segmentUseCases/guestUseCases/deleteSegmentGuestUseCase/deleteSegmentGuestController";
import {
  UpdateGuestSegmentGuestController,
  UpdateSegmentGuestValidator,
} from "@useCases/segmentUseCases/guestUseCases/updateSegmentGuestUseCase/updateSegementGuestController";
import { validate } from "@utils/validate";
import { Router } from "express";

const router = Router();

router.patch(
  "/:segment_id",
  UpdateSegmentGuestValidator(),
  validate,
  UpdateGuestSegmentGuestController
);

router.post(
  "/",
  CreateSegmentGuestValidator(),
  validate,
  CreateSegmentGuestController
);

router.delete(
  "/:segment_id",
  DeleteSegmentGuestValidator(),
  validate,
  DeleteSegmentGuestController
);

export default router;
