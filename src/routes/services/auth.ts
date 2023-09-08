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
import { googleOAuthGetUrlController } from "@useCases/auhUseCases/googleOAuthGetUrl/googleOAuthGetUrlController";
import {
  googleOAuthAutenticateController,
  googleOAuthAutenticateValidator,
} from "@useCases/auhUseCases/googleOAuthAutenticate/googleOAuthAutenticateController";

const router = Router();

router.post("/register", SignUpValidator(), validate, SignUpController);

router.post("/login", SignInValidator(), validate, SignInController);

router.get("/me", useAuth, GetMeController);

router.get("/google/oauth", googleOAuthGetUrlController);

router.post(
  "/google/oauth",
  googleOAuthAutenticateValidator(),
  validate,
  googleOAuthAutenticateController
);

export default router;
