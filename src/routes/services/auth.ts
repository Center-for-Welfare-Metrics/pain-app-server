import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "src/middlewares/auth";
import {
  SignInController,
  SignInValidator,
} from "src/useCases/auhUseCases/SignIn/signInController";
import {
  SignUpController,
  SignUpValidator,
} from "src/useCases/auhUseCases/SignUp/signUpController";
import { GetMeController } from "src/useCases/auhUseCases/getMe/getMeController";

const router = Router();

router.post("/register", SignUpValidator(), validate, SignUpController);

router.post("/login", SignInValidator(), validate, SignInController);

router.get("/me", useAuth, GetMeController);

export default router;
