import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  CreateTrackController,
  CreateTrackValidator,
} from "@useCases/trackUseCases/createTrackUseCase/createTrackController";
import { PaginationMiddleware } from "@utils/pagination";
import {
  ListTracksController,
  ListTracksValidator,
} from "@useCases/trackUseCases/listTracksUseCase/listTracksController";
import {
  UpdateTrackController,
  UpdateTrackValidator,
} from "@useCases/trackUseCases/updateTrackUseCase/updateTrackController";

const router = Router();

router.use(useAuth);

router.post("/", CreateTrackValidator(), validate, CreateTrackController);

router.get(
  "/",
  ListTracksValidator(),
  validate,
  PaginationMiddleware,
  ListTracksController
);

router.patch(
  "/:track_id",
  UpdateTrackValidator(),
  validate,
  UpdateTrackController
);

export default router;
