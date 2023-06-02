import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import { useSuper } from "@middlewares/super";
import {
  SetUserRoleController,
  SetUserRoleValidator,
} from "@useCases/accountUseCases/setUserRole/setUserRoleController";

const router = Router();

router.use(useAuth, useSuper);

router.patch("/role", SetUserRoleValidator(), validate, SetUserRoleController);

export default router;
