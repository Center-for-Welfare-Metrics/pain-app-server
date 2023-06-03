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

const router = Router();

router.use(useAuth);

router.patch("/", UpdateAccountValidator(), validate, UpdateAccountController);

router.patch(
  "/password",
  UpdateAccountPasswordValidator(),
  validate,
  UpdateAccountPasswordController
);

router.patch("/role", SetUserRoleValidator(), validate, SetUserRoleController);

export default router;
