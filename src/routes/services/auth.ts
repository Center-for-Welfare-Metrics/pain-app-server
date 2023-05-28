import { Router } from "express";
import {
  SignUpController,
  SignUpValidator,
} from "src/useCases/auhUseCases/SignUp/signUpController";

const router = Router();

router.post("/register", SignUpValidator, SignUpController);

export default router;
