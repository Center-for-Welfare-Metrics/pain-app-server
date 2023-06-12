import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  CreateEpisodeController,
  CreateEpisodeValidator,
} from "@useCases/episodeUseCases/createEpisodeUseCase/createEpisodeController";
import {
  GetEpisodeByIdController,
  GetEpisodeByIdValidator,
} from "@useCases/episodeUseCases/getEpisodeById/getEpisodeByIdController";
import { PaginationMiddleware } from "@utils/pagination";
import {
  ListEpisodesController,
  ListEpisodesValidator,
} from "@useCases/episodeUseCases/listEpisodesUseCase/listEpisodesController";

const router = Router();

router.use(useAuth);

router.post("/", CreateEpisodeValidator(), validate, CreateEpisodeController);

router.get(
  "/",
  ListEpisodesValidator(),
  validate,
  PaginationMiddleware,
  ListEpisodesController
);

router.get(
  "/:episode_id",
  GetEpisodeByIdValidator(),
  validate,
  GetEpisodeByIdController
);

export default router;
