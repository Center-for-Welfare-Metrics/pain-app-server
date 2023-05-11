import { HarmCategoryModel } from "@models/zoo/harm_category";
import { HarmTypeModel } from "@models/zoo/harm_type";

const { reorder } = require("../../utils/sort");

export const list = async (req, res, next) => {
  try {
    let harm_categories = await HarmCategoryModel.find({}).populate("harms");

    res.status(200).send(harm_categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    let { name, order } = req.body;
    let harm_category_values = {
      userId: req.user,
      name: name,
      order: order,
    };

    let new_harm_category = new HarmCategoryModel(harm_category_values);
    let created_harm_category = await new_harm_category.save();

    res.status(200).send(created_harm_category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = req.body;

    let updated_harm_category = await HarmCategoryModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    res.status(200).send(updated_harm_category);
  } catch (error) {
    next(error);
  }
};

export const removeCategory = async (req, res, next) => {
  try {
    let { id } = req.params;

    HarmCategoryModel.findById(id).then((harm) => {
      harm.deleteOne();
      res.sendStatus(200);
    });
  } catch (error) {
    next(error);
  }
};

export const createHarmType = async (req, res, next) => {
  try {
    let { name, order, color, harmCategoryId } = req.body;

    let harm_type_values = {
      userId: req.user,
      name: name,
      order: order,
      color: color,
      harmCategoryId: harmCategoryId,
    };

    let new_harm_type = new HarmTypeModel(harm_type_values);

    let created_harm_type = await new_harm_type.save();

    res.status(200).send(created_harm_type);
  } catch (error) {
    next(error);
  }
};

export const updateHarmType = async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = req.body;

    let updated_harm_type = await HarmTypeModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).send(updated_harm_type);
  } catch (error) {
    next(error);
  }
};

export const removeType = async (req, res, next) => {
  try {
    let { id } = req.params;

    HarmTypeModel.findById(id).then((harm) => {
      harm.deleteOne();
      res.sendStatus(200);
    });
  } catch (error) {
    next(error);
  }
};

export const reorderCategory = async (req, res, next) => {
  const { items } = req.body;

  reorder(items, HarmCategoryModel)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
};

export const reorderHarmType = async (req, res, next) => {
  const { items } = req.body;

  reorder(items, HarmTypeModel)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
};
