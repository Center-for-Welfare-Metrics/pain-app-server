import { Router } from "express";
import * as issueController from "@controllers/issue";
import { verifyToken } from "@middlewares/authentication";

const router = Router();

router.all("/*", verifyToken());

router.post("/", issueController.create);

export default router;
