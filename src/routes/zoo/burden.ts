import { Router } from "express";
import { BurdenModel } from "@models/zoo/burden";
import * as burdenController from "@controllers/zoo/burden";
import { verifyToken } from "@middlewares/authentication";
import { generateEndpoints, methods } from "@generators/crud-endpoints";

const router = Router();

router.all("/*", verifyToken());

router.get("/count", burdenController.countAllWithPatient);

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

generateEndpoints(router, BurdenModel, [
  {
    method: methods.GET,
    config: {
      populateFields: ["units", "productionSystemId"],
      additionalFilterMappings,
    },
  },
  {
    method: methods.GET_BY_ID,
    config: {
      populateFields: ["units", "productionSystemId", "color"],
    },
  },
  {
    method: methods.DELETE_BY_ID,
  },
]);

router.post("/", burdenController.create);

router.put("/:id", burdenController.updateById);

router.put("/update-resume/:id/:prod_id?", burdenController.updateResume);

router.post("/reorder", burdenController.reorder);

export default router;
