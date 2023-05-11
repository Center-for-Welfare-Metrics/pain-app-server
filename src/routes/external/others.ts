import { Router } from "express";
import { LifeFateModel } from "@models/external/LifeFate";
import { PhaseModel } from "@models/external/Phase";
import { ProductionSystemModel } from "@models/external/ProductionSystem";

const router = Router();

router.all("/*");

router.get("/lifefate/:_id", (req, res) => {
  let { _id } = req.params;
  LifeFateModel.findOne({ _id })
    .then((document) => {
      if (document) {
        return res.status(200).send(document);
      }
      res.sendStatus(404);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/phase/:_id", (req, res) => {
  let { _id } = req.params;
  console.log(_id);
  PhaseModel.findOne({ _id })
    .then((document) => {
      if (document) {
        return res.status(200).send(document);
      }
      res.sendStatus(404);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/productionsystem/:_id", (req, res) => {
  let { _id } = req.params;
  ProductionSystemModel.findOne({ _id })
    .then((document) => {
      if (document) {
        return res.status(200).send(document);
      }
      res.sendStatus(404);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

export default router;
