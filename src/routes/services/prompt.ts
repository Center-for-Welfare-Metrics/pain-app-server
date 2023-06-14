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
import {
  GetPromptController,
  GetPromptValidator,
} from "@useCases/promptUseCases/getPrompt/getPromptController";
import { useSuper } from "@middlewares/super";
import { ListPromptsController } from "@useCases/promptUseCases/listPromptsUseCase/listPromptsController";
import {
  UpdatePromptController,
  UpdatePromptValidator,
} from "@useCases/promptUseCases/updatePromptUseCase/updatePromptController";
import {
  DeletePromptController,
  DeletePromptValidator,
} from "@useCases/promptUseCases/deletePromptUseCase/deletePromptController";
import { GetLastUpdatedPromptController } from "@useCases/promptUseCases/getLastUpdatedPromptUseCase/getLastUpdatedPromptController";

const router = Router();

router.use(useAuth, useSuper);

router.post(
  "/generate",
  GenerateCompletionValidator(),
  validate,
  GenerateCompletionController
);

router.post("/", SavePromptValidator(), validate, SavePromptController);

router.get("/", ListPromptsController);

router.get("/last", GetLastUpdatedPromptController);

router.get("/:prompt_id", GetPromptValidator(), validate, GetPromptController);

router.patch(
  "/:prompt_id",
  UpdatePromptValidator(),
  validate,
  UpdatePromptController
);

router.delete(
  "/:prompt_id",
  DeletePromptValidator(),
  validate,
  DeletePromptController
);

export default router;
