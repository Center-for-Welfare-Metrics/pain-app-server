import { useAuth } from "@middlewares/auth";
import { ClearUserController } from "@useCases/testUseCases/clearUser/clearUserController";
import { Router } from "express";

const router = Router();

router.delete("/clear-user", useAuth, ClearUserController);

export default router;
