import { Request, Response } from "express";
import { CreateEpisodeUseCase } from "./createEpisodeUseCase";
import { body } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";

type CreateEpisodeRequestBody = {
  patient_id: string;
};

export const CreateEpisodeController = async (
  request: Request<any, any, CreateEpisodeRequestBody>,
  response: Response
) => {
  const { patient_id } = request.body;

  try {
    const user_id = request["user"]._id;

    const episode = await CreateEpisodeUseCase({
      user_id,
      patient_id,
    });

    return response.status(201).json(episode);
  } catch (error) {
    return response.status(500).json({ message: "Internal server error" });
  }
};

export const CreateEpisodeValidator = () => [
  body("patient_id")
    .isMongoId()
    .custom(async (patient_id, { req }) => {
      const user_id = req["user"]._id;

      const patient = await GetPatientByIdImplementation(patient_id);

      if (!patient) {
        throw new Error("Patient not found");
      }

      if (patient.creator_id.toString() !== user_id.toString()) {
        throw new Error("Patient not found");
      }
    }),
];
