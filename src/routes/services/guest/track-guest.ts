import { validate } from "@utils/validate";
import { Router } from "express";
import { PaginationMiddleware } from "@utils/pagination";

import {
  ListTracksGuestController,
  ListTracksGuestValidator,
} from "@useCases/trackUseCases/guestUseCases/listTracksGuestUseCase/listTracksGuestController";
import {
  CreateTrackGuestController,
  CreateTrackGuestValidator,
} from "@useCases/trackUseCases/guestUseCases/createTrackGuestUseCase/createTrackGuestController";
import {
  UpdateTrackGuestController,
  UpdateTrackGuestValidator,
} from "@useCases/trackUseCases/guestUseCases/updateTrackGuestUseCase/updateTrackGuestController";
import {
  DeleteTrackGuestController,
  DeleteTrackGuestValidator,
} from "@useCases/trackUseCases/guestUseCases/deleteTrackGuestUseCase/deleteTrackGuestController";

const router = Router();

router.post(
  "/",
  CreateTrackGuestValidator(),
  validate,
  CreateTrackGuestController
);

router.get(
  "/",
  ListTracksGuestValidator(),
  validate,
  PaginationMiddleware,
  ListTracksGuestController
);

router.patch(
  "/:track_id",
  UpdateTrackGuestValidator(),
  validate,
  UpdateTrackGuestController
);

router.delete(
  "/:track_id",
  DeleteTrackGuestValidator(),
  validate,
  DeleteTrackGuestController
);

export default router;
