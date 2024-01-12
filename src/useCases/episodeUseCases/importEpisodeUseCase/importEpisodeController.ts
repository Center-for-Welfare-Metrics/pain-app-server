import { Request, Response } from "express";
import { param } from "express-validator";
import { importEpisodeUseCase } from "./importEpisodeUseCase";
import { ImportEpisodeStructure } from "./type";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";

type UpdateEpisodeRequestParams = {
  patient_id: string;
};

type UpdateEpisodeRequestBody = ImportEpisodeStructure;

export const ImportEpisodeController = async (
  request: Request<UpdateEpisodeRequestParams, any, UpdateEpisodeRequestBody>,
  response: Response
) => {
  const { patient_id } = request.params;

  try {
    const user_id = request["user"]._id;
    const episode = await importEpisodeUseCase({
      creator_id: user_id,
      patient_id,
      episode: request.body,
    });

    return response.status(200).json(episode);
  } catch (err) {
    console.log(err);
    return response.sendStatus(500);
  }
};

export const ImportEpisodeValidator = () => [
  param("patient_id")
    .optional()
    .isMongoId()
    .custom(async (patient_id, { req }) => {
      const user_id = req["user"]._id;

      const patient = await GetPatientByIdImplementation(patient_id);

      if (!patient) {
        throw new Error("Patient not found");
      }

      if (patient.creator_id.toString() !== user_id) {
        throw new Error("Patient not found");
      }
    }),
];
