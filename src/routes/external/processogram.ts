import { Router } from "express";

import * as processogramController from "@controllers/external/ProcessogramController";

const router = Router();

router.all("/*");

router.get("/all", processogramController.getAll);

router.patch("/:_id", processogramController.updateCircumstance);

export default router;
