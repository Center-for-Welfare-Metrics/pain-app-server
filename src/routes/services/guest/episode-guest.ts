import { validate } from "@utils/validate";
import { Router } from "express";
import { CreateGuestEpisodeController } from "@useCases/episodeUseCases/guestUseCases/createGuestEpisodeUseCase/createGuestEpisodeController";
import {
  GetGuestEpisodeByIdController,
  GetGuestEpisodeByIdValidator,
} from "@useCases/episodeUseCases/guestUseCases/getGuestEpisodeByIdUseCase/getGuestEpisodeByIdController";
import {
  UpdateGuestEpisodeController,
  UpdateGuestEpisodeValidator,
} from "@useCases/episodeUseCases/guestUseCases/updateGuestEpisodeUseCase/updateGuestEpisodeController";

const router = Router();

router.post("/", CreateGuestEpisodeController);

router.get(
  "/:episode_id",
  GetGuestEpisodeByIdValidator(),
  validate,
  GetGuestEpisodeByIdController
);

router.patch(
  "/:episode_id",
  UpdateGuestEpisodeValidator(),
  validate,
  UpdateGuestEpisodeController
);

export default router;
