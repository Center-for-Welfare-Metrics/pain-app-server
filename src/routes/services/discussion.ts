import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  CreateDiscussionController,
  CreateDiscussionValidator,
} from "@useCases/discussionUseCases/createDiscussionUseCase/createDiscussionController";
import { validate } from "@utils/validate";

const router = Router();

router.use(useAuth);

router.post(
  "/",
  CreateDiscussionValidator(),
  validate,
  CreateDiscussionController
);

export default router;
