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

const router = Router();

router.use(useAuth);

router.post("/", CreatePatientValidator(), validate, CreatePatientController);

router.get("/", PaginationMiddleware, ListPatientsController);

router.get(
  "/:id",
  GetPatiengByIdValidator(),
  validate,
  GetPatientByIdController
);

router.patch(
  "/:patient_id",
  UpdatePatientValidator(),
  validate,
  UpdatePatientController
);

export default router;
