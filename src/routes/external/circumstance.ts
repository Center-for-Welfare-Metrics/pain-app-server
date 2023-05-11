import { Router } from "express";
import { verifyToken } from "@middlewares/authentication";
import * as circumstanceController from "@controllers/external/CircumstanceController";

const router = Router();

router.all("/*", verifyToken());

router.get("/search", circumstanceController.search);

export default router;
