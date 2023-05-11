import { Router } from "express";
import * as harmController from "@controllers/zoo/harm";
import { verifyToken } from "@middlewares/authentication";

const router = Router();

router.all("/*", verifyToken());

router.post("/category", harmController.createCategory);

router.post("/category/reorder", harmController.reorderCategory);

router.delete("/category/:id", harmController.removeCategory);

router.put("/category/:id", harmController.updateCategory);

router.post("/type", harmController.createHarmType);

router.post("/type/reorder", harmController.reorderHarmType);

router.delete("/type/:id", harmController.removeType);

router.put("/type/:id", harmController.updateHarmType);

router.get("/list", harmController.list);

export default router;
