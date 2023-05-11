import { Router } from "express";
import { AcuteChronicModel } from "@models/reference-data/acute-chronic";
import { PainDepthModel } from "@models/reference-data/pain-depth";
import { TextureModel } from "@models/reference-data/pain-texture";
import { PainLevelModel } from "@models/reference-data/pain-level";
import { UnitsModel } from "@models/reference-data/units";
import { EstimativeTypeModel } from "@models/reference-data/estimative-type";
import { generateEndpoints, methods } from "@generators/crud-endpoints";

const router = Router();

router.all("/*");

generateEndpoints(router, AcuteChronicModel, [
  {
    method: methods.GET,
    config: {
      path: "/stages",
    },
  },
  {
    method: methods.CREATE,
    config: {
      path: "/stages",
    },
  },
]);

generateEndpoints(router, PainDepthModel, [
  {
    method: methods.GET,
    config: {
      path: "/depths",
    },
  },
  {
    method: methods.CREATE,
    config: {
      path: "/depths",
    },
  },
]);

generateEndpoints(router, TextureModel, [
  {
    method: methods.GET,
    config: {
      path: "/textures",
    },
  },
  {
    method: methods.CREATE,
    config: {
      path: "/textures",
    },
  },
]);

generateEndpoints(router, PainLevelModel, [
  {
    method: methods.GET,
    config: {
      path: "/pain-levels",
    },
  },
  {
    method: methods.CREATE,
    config: {
      path: "/pain-levels",
    },
  },
]);

generateEndpoints(router, EstimativeTypeModel, [
  {
    method: methods.GET,
    config: {
      path: "/estimatives",
    },
  },
  {
    method: methods.CREATE,
    config: {
      path: "/estimatives",
    },
  },
]);

generateEndpoints(router, UnitsModel, [
  {
    method: methods.GET,
    config: {
      path: "/units",
    },
  },
  {
    method: methods.CREATE,
    config: {
      path: "/units",
    },
  },
]);

export default router;
