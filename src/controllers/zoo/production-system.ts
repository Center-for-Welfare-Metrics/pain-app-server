import { reorder as sortReorder } from "../../utils/sort";

import { ProductionSystemModel } from "../../models/zoo/production-system";
import { BurdenModel } from "../../models/zoo/burden";
import { ConfigModel } from "../../models/config";

import Run from "../../api/multistage";

import RunPop from "../../api/stagepop";

export const get = async (req, res, next) => {
  let user = req.user;
  if (user.super) {
    ProductionSystemModel.find({})
      .populate({
        path: "burdens",
        populate: {
          path: "color",
        },
      })
      .then((production_systems) => {
        res.send(production_systems);
      });
  } else {
    ProductionSystemModel.find({ userId: user._id })
      .populate("burdens")
      .then((production_systems) => {
        res.send(production_systems);
      });
  }
};

export const create = async (req, res, next) => {
  try {
    const patient = { ...req.body, userId: null };
    if (!patient.name) {
      const queryObj: any = {};
      Object.assign(queryObj, req.query);
      queryObj.userId = req.user._id;
      const count = await ProductionSystemModel.countDocuments(queryObj).exec();
      patient.name = `Production System ${count + 1}`;
      patient.order = count + 1;
    }
    if (req.user) {
      patient.userId = req.user._id;
    }

    if (!patient.userId) delete patient.userId;

    const newProductionSystem = new ProductionSystemModel(patient);
    const createdProductionSystem = await newProductionSystem.save();
    res.status(201);
    res.send(createdProductionSystem);
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    await ProductionSystemModel.findByIdAndDelete(req.params.id).exec();
    await BurdenModel.deleteMany({
      productionSystemId: req.params.id,
    }).exec();
    await ConfigModel.findOneAndRemove({
      hens_production_system: req.params.id,
    });
    await ConfigModel.findOneAndRemove({
      broilers_production_system: req.params.id,
    });
    res.send();
  } catch (err) {
    next(err);
  }
};

export const hens = async (req, res, next) => {
  try {
    const config = await ConfigModel.find({
      hens_production_system: { $exists: true },
    })
      .populate({
        path: "hens_production_system",
        populate: {
          path: "burdens",
        },
      })
      .exec();

    res.send(config);
  } catch (error) {
    next(error);
  }
};

export const newHens = async (req, res, next) => {
  try {
    const { prod_id } = req.params;

    const new_config = await ConfigModel.findOneAndUpdate(
      { hens_production_system: prod_id },
      { hens_production_system: prod_id },
      { upsert: true, new: true }
    )
      .populate("hens_production_system")
      .exec();

    res.send(new_config);
  } catch (error) {
    next(error);
  }
};

export const deleteHens = async (req, res, next) => {
  try {
    const { prod_id } = req.params;

    await ConfigModel.findOneAndRemove({ hens_production_system: prod_id });

    res.send();
  } catch (error) {
    next(error);
  }
};

export const broilers = async (req, res, next) => {
  try {
    const config = await ConfigModel.find({
      broilers_production_system: { $exists: true },
    })
      .populate({
        path: "broilers_production_system",
        populate: {
          path: "burdens",
        },
      })
      .exec();

    res.send(config);
  } catch (error) {
    next(error);
  }
};

export const newBroilers = async (req, res, next) => {
  try {
    const { prod_id } = req.params;

    const new_config = await ConfigModel.findOneAndUpdate(
      { broilers_production_system: prod_id },
      { broilers_production_system: prod_id },
      { upsert: true, new: true }
    )
      .populate("broilers_production_system")
      .exec();

    res.send(new_config);
  } catch (error) {
    next(error);
  }
};

export const deleteBroilers = async (req, res, next) => {
  try {
    const { prod_id } = req.params;

    await ConfigModel.findOneAndRemove({
      broilers_production_system: prod_id,
    });

    res.send();
  } catch (error) {
    next(error);
  }
};

export const stunning = async (req, res, next) => {
  try {
    const config = await ConfigModel.find({
      stunning_production_system: { $exists: true },
    })
      .populate({
        path: "stunning_production_system",
        populate: {
          path: "burdens",
        },
      })
      .exec();

    res.send(config);
  } catch (error) {
    next(error);
  }
};

export const newStunning = async (req, res, next) => {
  try {
    const { prod_id } = req.params;

    const new_config = await ConfigModel.findOneAndUpdate(
      {
        stunning_production_system: prod_id,
      },
      { stunning_production_system: prod_id },
      { upsert: true, new: true }
    )
      .populate("stunning_production_system")
      .exec();

    res.send(new_config);
  } catch (error) {
    next(error);
  }
};

export const deleteStunning = async (req, res, next) => {
  try {
    const { prod_id } = req.params;

    await ConfigModel.findOneAndRemove({
      stunning_production_system: prod_id,
    });

    res.send();
  } catch (error) {
    next(error);
  }
};

export const calcResume = async (req, res, next) => {
  const { durations, segments } = req.body;

  Run({ durations }, segments)
    .then((resume) => {
      res.send(resume);
    })
    .catch((error) => {
      next(error);
    });
};

export const calcMainResume = async (req, res, next) => {
  const { durations, tracks, occurrences, prevalence } = req.body;
  RunPop({ durations, tracks, occurrences, prevalence })
    .then((resume) => {
      res.send(resume);
    })
    .catch((error) => {
      next(error);
    });
};

export const reorder = async (req, res, next) => {
  const { items } = req.body;
  sortReorder(items, ProductionSystemModel)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
};
