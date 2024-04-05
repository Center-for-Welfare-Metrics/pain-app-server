import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  UpdateAccountValidator,
  UpdateAccountController,
} from "@useCases/accountUseCases/updateAccount/updateAccountController";
import {
  UpdateAccountPasswordController,
  UpdateAccountPasswordValidator,
} from "@useCases/accountUseCases/updateAccountPassword/updateAccountPasswordController";
import {
  RecoveryPasswordController,
  RecoveryPasswordValidator,
} from "@useCases/accountUseCases/recoveryPassword/recoveryPasswordController";
import {
  ResetPasswordController,
  ResetPasswordValidator,
} from "@useCases/accountUseCases/resetPassword/resetPasswordController";
import {
  RequestEmailChangeController,
  RequestEmailChangeValidator,
} from "@useCases/accountUseCases/requestEmailChangeUseCase/requestEmailChangeController";
import {
  ConfirmEmailChangeController,
  ConfirmEmailChangeValidator,
} from "@useCases/accountUseCases/confirmEmailChange/confirmEmailChangeController";
import { RequestSetAccountPasswordController } from "@useCases/accountUseCases/requestSetAccountPasswordUseCase/requestSetAccountPasswordController";
import {
  ConfirmSetPasswordCodeController,
  ConfirmSetPasswordCodeValidator,
} from "@useCases/accountUseCases/confirmSetPasswordCode/confirmSetPasswordCodeController";

const router = Router();

router.patch(
  "/",
  useAuth,
  UpdateAccountValidator(),
  validate,
  UpdateAccountController
);

router.patch(
  "/password",
  useAuth,
  UpdateAccountPasswordValidator(),
  validate,
  UpdateAccountPasswordController
);

router.post(
  "/recovery-password",
  RecoveryPasswordValidator(),
  validate,
  RecoveryPasswordController
);

router.patch(
  "/reset-password",
  ResetPasswordValidator(),
  validate,
  ResetPasswordController
);

router.post(
  "/request-email-change",
  useAuth,
  RequestEmailChangeValidator(),
  validate,
  RequestEmailChangeController
);

router.patch(
  "/confirm-email-change",
  useAuth,
  ConfirmEmailChangeValidator(),
  validate,
  ConfirmEmailChangeController
);

router.post(
  "/request-set-account-password",
  useAuth,
  RequestSetAccountPasswordController
);

router.patch(
  "/confirm-set-password-code",
  useAuth,
  ConfirmSetPasswordCodeValidator(),
  validate,
  ConfirmSetPasswordCodeController
);

export default router;
