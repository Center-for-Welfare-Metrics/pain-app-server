import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  CreatePatientController,
  CreatePatientValidator,
} from "@useCases/patientUseCases/createPatientUseCase/createPatientController";

const router = Router();

router.use(useAuth);

router.post("/", CreatePatientValidator(), validate, CreatePatientController);

export default router;
