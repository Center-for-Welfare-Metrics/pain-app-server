import { ProcessogramModel } from "@models/external/Processogram";
import { Response } from "express";

export const getAll = (request, response) => {
  ProcessogramModel.find().then((documents) => {
    response.status(200).json(documents);
  });
};

export const updateCircumstance = async (request, response: Response) => {
  // let { _id } = request.params;
  // let { id_tree, field, value } = request.body;
  // let { lifeFate, phase, circumstance } = id_tree;
  // try {
  //   const document = await ProcessogramModel.findById(_id);
  //   if (document) {
  //     let circumstance_obj = document.lifefates
  //       .id(lifeFate)
  //       .phases.id(phase)
  //       .circumstances.id(circumstance);

  //     circumstance_obj[field] = value;

  //     await document.save();

  response.sendStatus(200);
  //   } else {
  //     response.sendStatus(404);
  //   }
  // } catch (error) {
  //   response.status(500).send(error);
  // }
};
