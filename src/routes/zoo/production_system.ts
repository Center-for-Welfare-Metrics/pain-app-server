import { Router } from "express";
import { ProductionSystemModel } from "@models/zoo/production-system";
import * as productionController from "@controllers/zoo/production-system";
import { verifyToken } from "@middlewares/authentication";
import { generateEndpoints, methods } from "@generators/crud-endpoints";
import { excelExport } from "@utils/excel-export";

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

generateEndpoints(router, ProductionSystemModel, [
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

router.get("/", productionController.get);
router.post("/", productionController.create);
router.delete("/:id", productionController.deleteById);
router.post("/hens/change/:prod_id", productionController.newHens);
router.delete("/hens/change/:prod_id", productionController.deleteHens);
router.post("/broilers/change/:prod_id", productionController.newBroilers);
router.delete("/broilers/change/:prod_id", productionController.deleteBroilers);
router.post("/stunning/change/:prod_id", productionController.newStunning);
router.delete("/stunning/change/:prod_id", productionController.deleteStunning);
router.get("/export/download", excelExport);
router.post("/reorder", productionController.reorder);

export default router;
