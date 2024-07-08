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
import {
  UpdateDiscussionTextController,
  UpdateDiscussionTextValidator,
} from "@useCases/discussionUseCases/updateDiscussionTextUseCase/updateDiscussionTextController";
import {
  DeleteDiscussionController,
  DeleteDiscussionValidator,
} from "@useCases/discussionUseCases/deleteDiscussionUseCase/deleteDiscussionController";

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

router.patch(
  "/:discussion_id",
  UpdateDiscussionTextValidator(),
  validate,
  UpdateDiscussionTextController
);

router.delete(
  "/:discussion_id",
  DeleteDiscussionValidator(),
  validate,
  DeleteDiscussionController
);

export default router;
