import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  UpdateSegmentController,
  UpdateSegmentValidator,
} from "@useCases/segmentUseCases/updateSegmentUseCase/updateSegementController";

const router = Router();

router.use(useAuth);

router.patch(
  "/:segment_id",
  UpdateSegmentValidator(),
  validate,
  UpdateSegmentController
);

export default router;
