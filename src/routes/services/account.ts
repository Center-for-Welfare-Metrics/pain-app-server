import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  SetUserRoleController,
  SetUserRoleValidator,
} from "@useCases/accountUseCases/setUserRole/setUserRoleController";
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

router.patch(
  "/role",
  useAuth,
  SetUserRoleValidator(),
  validate,
  SetUserRoleController
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

export default router;
