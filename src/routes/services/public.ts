import {
  ContactFormController,
  ContactFormValidator,
} from "@useCases/publicUseCases/contactFormUseCase/contactFormController";
import {
  GenerateResponseController,
  GenerateResponseValidator,
} from "@useCases/publicUseCases/generateResponseUseCase/generateResponseController";
import { getMainPromptAttributesController } from "@useCases/publicUseCases/getMainPromptAttributesUseCase/getMainPromptAttributesController";
import { validate } from "@utils/validate";
import { Router } from "express";

const router = Router();

router.get("/attributes", getMainPromptAttributesController);

router.post(
  "/generate",
  GenerateResponseValidator(),
  validate,
  GenerateResponseController
);

router.post(
  "/contact-form",
  ContactFormValidator(),
  validate,
  ContactFormController
);

export default router;
