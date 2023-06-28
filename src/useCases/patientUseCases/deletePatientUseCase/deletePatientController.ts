import { Request, Response } from "express";
import { DeletePatientUseCase } from "./deletePatientUseCase";
import { param } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";

type DeletePatientRequestParams = {
  patient_id: string;
};

export const DeletePatientController = async (
  request: Request<DeletePatientRequestParams>,
  response: Response
) => {
  const { patient_id } = request.params;

  try {
    await DeletePatientUseCase({ patient_id });
    return response.sendStatus(200);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const DeletePatientValidator = () => [
  param("patient_id")
    .isMongoId()
    .custom(async (patient_id, { req }) => {
      const user_id = req.user["_id"];

      const patient = await GetPatientByIdImplementation(patient_id);

      if (!patient) {
        throw new Error("Patient not found");
      }

      if (patient.creator_id.toString() !== user_id.toString()) {
        throw new Error("Patient not found");
      }
    }),
];
