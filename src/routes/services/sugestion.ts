import { validate } from "@utils/validate";
import { Router } from "express";
import { useAuth } from "@middlewares/auth";
import {
  SugestionSpeciesFieldController,
  SugestionSpeciesFieldValidator,
} from "@useCases/speciesFieldUseCases/speciesFieldSugestion/speciesFieldController";

const router = Router();
router.use(useAuth);

router.get(
  "/scientificName/:animal",
  SugestionSpeciesFieldValidator(),
  validate,
  SugestionSpeciesFieldController
);

export default router;
