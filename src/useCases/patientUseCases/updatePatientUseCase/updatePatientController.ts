import { Request, Response } from "express";
import { UpdatePatientUseCase } from "./updatePatientUseCase";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body, param } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";
import { PatientTypeEnum, patientTypeEnum } from "@models/patient";

type UpdatePatientRequestBody = {
  name?: string;
  birth_date?: string;
  about?: string;
  location?: string;
  common_name?: string;
  scientific_name?: string;
  type?: PatientTypeEnum;
};

type UpdatePatientRequestParams = {
  patient_id: string;
};

export const UpdatePatientController = async (
  req: Request<UpdatePatientRequestParams, any, UpdatePatientRequestBody>,
  res: Response
) => {
  const { patient_id } = req.params;
  const {
    name,
    birth_date,
    about,
    common_name,
    location,
    scientific_name,
    type,
  } = req.body;

  try {
    const updated = await UpdatePatientUseCase({
      patient_id,
      update: CleanUpUndefined({
        name,
        birth_date,
        about,
        type,
        common_name,
        location,
        scientific_name,
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
  body("type").isIn(patientTypeEnum),
  body("birth_date")
    .optional({
      values: "null",
    })
    .isString(),
  body("about").optional().isString(),
  body("location").optional().isString(),
  body("common_name").optional().isString(),
  body("scientific_name").optional().isString(),
];
