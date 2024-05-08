import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  CreatePatientController,
  CreatePatientValidator,
} from "@useCases/patientUseCases/createPatientUseCase/createPatientController";
import { PaginationMiddleware } from "@utils/pagination";
import { ListPatientsController } from "@useCases/patientUseCases/listPatientsUseCase/listPatientsController";
import {
  GetPatiengByIdValidator,
  GetPatientByIdController,
} from "@useCases/patientUseCases/getPatientByIdUseCase/getPatientByIdController";
import {
  UpdatePatientController,
  UpdatePatientValidator,
} from "@useCases/patientUseCases/updatePatientUseCase/updatePatientController";
import {
  DeletePatientController,
  DeletePatientValidator,
} from "@useCases/patientUseCases/deletePatientUseCase/deletePatientController";
import { Return404OnNotFound } from "@utils/helpers/validation-helpers";
import { ListPatientsSuggestionController } from "@useCases/patientUseCases/listPatientsSuggestion/listPatientsSuggestionController";
import { AddToBookMarkController } from "@useCases/patientUseCases/addToBookmark/addToBookMarkController";

const router = Router();

router.use(useAuth);

router.post("/", CreatePatientValidator(), validate, CreatePatientController);

router.get("/", PaginationMiddleware, ListPatientsController);

router.get(
  "/suggestion",
  PaginationMiddleware,
  ListPatientsSuggestionController
);

router.get(
  "/:id",
  GetPatiengByIdValidator(),
  Return404OnNotFound,
  validate,
  GetPatientByIdController
);

router.patch(
  "/:patient_id",
  UpdatePatientValidator(),
  Return404OnNotFound,
  validate,
  UpdatePatientController
);

router.post("/bookmark", AddToBookMarkController);

router.delete(
  "/:patient_id",
  DeletePatientValidator(),
  Return404OnNotFound,
  validate,
  DeletePatientController
);

export default router;
