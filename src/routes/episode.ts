import { Router } from "express";
import { EpisodeModel } from "@models/episode structure/episode";
import * as episodeController from "@controllers/episode";
import { verifyToken } from "@middlewares/authentication";
import { generateEndpoints, methods } from "@generators/crud-endpoints";
import { GetEpisodeByIdController } from "src/useCases/episodeUseCases/getEpisodeById/getEpisodeByIdController";

const router = Router();

router.get("/count", verifyToken(), episodeController.countAllWithPatient);

const additionalFilterMappings = [
  {
    property: "user",
    fields: [
      {
        source: "_id",
        target: "userId",
      },
    ],
  },
];

generateEndpoints(router, EpisodeModel, [
  {
    method: methods.GET,
    config: {
      additionalFilterMappings,
      middleware: verifyToken(),
    },
  },
  // {
  //   method: methods.GET_BY_ID,
  //   config: {
  //     populateFields: ["units", "patientId"],
  //   },
  // },
  {
    method: methods.DELETE_BY_ID,
    middleware: verifyToken(),
  },
]);

router.get("/:episode_id", GetEpisodeByIdController);
router.post("/", episodeController.create);
router.put("/:id", episodeController.updateById);
router.put("/update-resume/:id", episodeController.updateResume);

export default router;
