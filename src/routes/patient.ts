import { Router } from "express";
import { PatientModel } from "@models/patient";
import * as patientController from "@controllers/patient";
import { verifyToken } from "@middlewares/authentication";
import { generateEndpoints, methods } from "@generators/crud-endpoints";

const router = Router();

router.all("/*", verifyToken());

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

generateEndpoints(router, PatientModel, [
  {
    method: methods.GET,
    config: {
      additionalFilterMappings,
      populateFields: ["episodesCount"],
    },
  },
  {
    method: methods.GET_COUNT,
    config: {
      additionalFilterMappings,
    },
  },
  {
    method: methods.GET_BY_ID,
  },
  {
    method: methods.UPDATE_BY_ID,
  },
]);

router.post("/", patientController.create);
router.delete("/:id", patientController.deleteById);

export default router;
