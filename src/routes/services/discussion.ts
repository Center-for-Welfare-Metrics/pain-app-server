import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  CreateDiscussionController,
  CreateDiscussionValidator,
} from "@useCases/discussionUseCases/createDiscussionUseCase/createDiscussionController";
import { validate } from "@utils/validate";
import {
  ListDiscussionController,
  ListDiscussionValidator,
} from "@useCases/discussionUseCases/listDiscussionUseCase/listDiscussionController";
import { PaginationMiddleware } from "@utils/pagination";
import {
  GetDiscussionByIdController,
  GetDiscussionByIdValidator,
} from "@useCases/discussionUseCases/getDiscussionByIdUseCase/getDiscussionByIdController";

const router = Router();

router.use(useAuth);

router.post(
  "/",
  CreateDiscussionValidator(),
  validate,
  CreateDiscussionController
);

router.get(
  "/",
  ListDiscussionValidator(),
  validate,
  PaginationMiddleware,
  ListDiscussionController
);

router.get(
  "/:discussion_id",
  GetDiscussionByIdValidator(),
  validate,
  GetDiscussionByIdController
);

export default router;
