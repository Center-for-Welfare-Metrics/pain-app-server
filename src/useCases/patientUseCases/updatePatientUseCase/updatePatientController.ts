import { Request, Response } from "express";
import { UpdatePatientUseCase } from "./updatePatientUseCase";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body, param } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";

type UpdatePatientRequestBody = {
  name?: string;
  birth_date?: string;
  about?: string;
};

type UpdatePatientRequestParams = {
  patient_id: string;
};

export const UpdatePatientController = async (
  req: Request<UpdatePatientRequestParams, any, UpdatePatientRequestBody>,
  res: Response
) => {
  const { patient_id } = req.params;
  const { name, birth_date, about } = req.body;

  try {
    const updated = await UpdatePatientUseCase({
      patient_id,
      update: CleanUpUndefined({
        name,
        birth_date,
        about,
      }),
    });

    res.status(200).json(updated);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const UpdatePatientValidator = () => [
  param("patient_id")
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
  body("name").optional().isString(),
  body("birth_date").optional().isString(),
  body("about").optional().isString(),
];
