import { Router } from "express";
import { getAuthUrl, signIn } from "@controllers/auth";

const router = Router();

router.get("/:provider/url", getAuthUrl);
router.post("/:provider/signin", signIn);

export default router;
