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
import {
  UpdateEpisodeController,
  UpdateEpisodeValidator,
} from "@useCases/episodeUseCases/updateEpisodeUseCase/updateEpisodeController";
import {
  DeleteEpisodeController,
  DeleteEpisodeValidator,
} from "@useCases/episodeUseCases/deleteEpisodeUseCase/deleteEpisodeController";
import {
  ExportEpisodeController,
  ExportEpisodeValidator,
} from "@useCases/episodeUseCases/exportEpisodeUseCase/exportEpisodeController";
import {
  ImportEpisodeController,
  ImportEpisodeValidator,
} from "@useCases/episodeUseCases/importEpisodeUseCase/importEpisodeController";
import { validationResult } from "express-validator";
import { NOT_FOUND_ERROR } from "@constants/validation";
import { Return404OnNotFound } from "@utils/helpers/validation-helpers";

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
  "/export/:episode_id",
  ExportEpisodeValidator(),
  validate,
  ExportEpisodeController
);

router.get(
  "/:episode_id",
  GetEpisodeByIdValidator(),
  Return404OnNotFound,
  validate,
  GetEpisodeByIdController
);

router.patch(
  "/:episode_id",
  UpdateEpisodeValidator(),
  Return404OnNotFound,
  validate,
  UpdateEpisodeController
);

router.delete(
  "/:episode_id",
  DeleteEpisodeValidator(),
  Return404OnNotFound,
  validate,
  DeleteEpisodeController
);

router.post(
  "/import/:patient_id",
  ImportEpisodeValidator(),
  validate,
  ImportEpisodeController
);

export default router;
