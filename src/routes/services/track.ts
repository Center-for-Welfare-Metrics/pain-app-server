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
import { Return404OnNotFound } from "@utils/helpers/validation-helpers";

const router = Router();

router.use(useAuth);

router.post("/", CreateTrackValidator(), validate, CreateTrackController);

router.get(
  "/",
  ListTracksValidator(),
  Return404OnNotFound,
  validate,
  PaginationMiddleware,
  (req, res) => ListTracksController(req, res)
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
