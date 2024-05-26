import { Router } from "express";
import { useAuth } from "@middlewares/auth";

import { PaginationMiddleware } from "@utils/pagination";
import { ListBookmarkEpisodesController } from "@useCases/bookmarkEpisodesUseCases/ListBookMarkEpisodeUseCase/listBookMarkController";

const router = Router();

router.use(useAuth);

router.get("/", PaginationMiddleware, ListBookmarkEpisodesController);

export default router;
