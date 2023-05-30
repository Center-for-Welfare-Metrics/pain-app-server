import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  GenerateCompletionController,
  GenerateCompletionValidator,
} from "@useCases/promptUseCases/generateCompletion/generateCompletionController";

const router = Router();

router.use(useAuth);

router.post(
  "/generate",
  GenerateCompletionValidator(),
  validate,
  GenerateCompletionController
);

export default router;
