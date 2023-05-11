import { Router } from "express";
import * as userController from "@controllers/user";
import { verifyToken } from "@middlewares/authentication";

const router = Router();

router.all("/*");

router.get("/", verifyToken(), userController.getSignedInUser);
router.post("/signin", userController.signIn);
router.post("/register", userController.register);
router.put("/password", verifyToken(), userController.changePassword);
router.put("/", verifyToken(), userController.updateUser);

export default router;
