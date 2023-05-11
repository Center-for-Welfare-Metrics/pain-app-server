import { Router } from "express";
import * as productionController from "@controllers/zoo/production-system";
import * as ChartController from "@controllers/zoo/chart";

const router = Router();

router.post("/hens", productionController.hens);
router.post("/broilers", productionController.broilers);
router.post("/stunning", productionController.stunning);
router.post("/hens/calc-resume", productionController.calcResume);
router.post("/hens/calc-main-resume", productionController.calcMainResume);
router.get("/chart/:prod_id", ChartController.get);

export default router;
