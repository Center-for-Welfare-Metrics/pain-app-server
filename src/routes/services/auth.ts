import { validate } from "@utils/validate";
import { Router } from "express";
import {
  SignUpController,
  SignUpValidator,
} from "src/useCases/auhUseCases/SignUp/signUpController";

const router = Router();

router.post("/register", SignUpValidator(), validate, SignUpController);

export default router;
