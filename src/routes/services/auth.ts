import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  SignInController,
  SignInValidator,
} from "@useCases/auhUseCases/SignIn/signInController";
import {
  SignUpController,
  SignUpValidator,
} from "@useCases/auhUseCases/SignUp/signUpController";
import { GetMeController } from "@useCases/auhUseCases/getMe/getMeController";

const router = Router();

router.post("/register", SignUpValidator(), validate, SignUpController);

router.post("/login", SignInValidator(), validate, SignInController);

router.get("/me", useAuth, GetMeController);

export default router;
