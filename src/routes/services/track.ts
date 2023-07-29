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
import {
  DeleteTrackController,
  DeleteTrackValidator,
} from "@useCases/trackUseCases/deleteTrackUseCase/deleteTrackController";

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

router.delete(
  "/:track_id",
  DeleteTrackValidator(),
  validate,
  DeleteTrackController
);

export default router;
