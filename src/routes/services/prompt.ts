import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  GenerateCompletionController,
  GenerateCompletionValidator,
} from "@useCases/promptUseCases/generateCompletion/generateCompletionController";
import {
  SavePromptController,
  SavePromptValidator,
} from "@useCases/promptUseCases/savePrompt/savePromptController";
import { GetPromptController } from "@useCases/promptUseCases/getPrompt/getPromptController";
import { useSuper } from "@middlewares/super";

const router = Router();

router.use(useAuth, useSuper);

router.post(
  "/generate",
  GenerateCompletionValidator(),
  validate,
  GenerateCompletionController
);

router.post("/", SavePromptValidator(), validate, SavePromptController);

router.get("/", GetPromptController);

export default router;
