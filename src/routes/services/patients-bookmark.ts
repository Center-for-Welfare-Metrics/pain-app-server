import { Router } from "express";
import { useAuth } from "@middlewares/auth";

import { PaginationMiddleware } from "@utils/pagination";
import { ListBookmarkPatientsController } from "@useCases/bookmarkPatientsUseCases/ListBookMarkPatientUseCase/listBookMarkController";

const router = Router();

router.use(useAuth);

router.get("/", PaginationMiddleware, ListBookmarkPatientsController);

export default router;
