import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  SetUserRoleController,
  SetUserRoleValidator,
} from "@useCases/accountUseCases/setUserRole/setUserRoleController";

const router = Router();

router.use(useAuth);

router.patch("/role", SetUserRoleValidator(), validate, SetUserRoleController);

export default router;
