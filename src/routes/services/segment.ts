import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  UpdateSegmentController,
  UpdateSegmentValidator,
} from "@useCases/segmentUseCases/updateSegmentUseCase/updateSegementController";
import {
  CreateSegmentController,
  CreateSegmentValidator,
} from "@useCases/segmentUseCases/createSegmentUseCase/createSegmentController";
import {
  DeleteSegmentController,
  DeleteSegmentValidator,
} from "@useCases/segmentUseCases/deleteSegmentUseCase/deleteSegmentController";

const router = Router();

router.use(useAuth);

router.patch(
  "/:segment_id",
  UpdateSegmentValidator(),
  validate,
  UpdateSegmentController
);

router.post("/", CreateSegmentValidator(), validate, CreateSegmentController);

router.delete(
  "/:segment_id",
  DeleteSegmentValidator(),
  validate,
  DeleteSegmentController
);

export default router;
