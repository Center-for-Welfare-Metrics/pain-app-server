import { Request, Response } from "express";
import { UpdatePatientUseCase } from "./updatePatientUseCase";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body, param } from "express-validator";

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
    const user_id = req["user"]._id;

    await UpdatePatientUseCase({
      patient_id,
      update: CleanUpUndefined({
        name,
        birth_date,
        about,
      }),
      user_id,
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const UpdatePatientControllerValidator = () => [
  param("patient_id").isMongoId(),
  body("name").optional().isString(),
  body("birth_date").optional().isString(),
  body("about").optional().isString(),
];
