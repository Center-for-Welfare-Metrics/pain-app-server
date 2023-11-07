import { Request, Response } from "express";
import { CreatePatientUseCase } from "./createPatientUseCase";
import { body } from "express-validator";
import { PatientTypeEnum, patientTypeEnum } from "@models/patient";

type CreatePatientRequestBody = {
  name: string;
  birth_date: string;
  type: PatientTypeEnum;
  production_system?: string;
  life_fate?: string;
  about?: string;
  location?: string;
  common_name?: string;
  scientific_name?: string;
};

export const CreatePatientController = async (
  req: Request<any, any, CreatePatientRequestBody>,
  res: Response
) => {
  const {
    name,
    birth_date,
    about,
    type,
    life_fate,
    production_system,
    common_name,
    location,
    scientific_name,
  } = req.body;

  const user_id = req["user"]?._id;

  try {
    const newPatient = await CreatePatientUseCase({
      name,
      birth_date,
      about,
      user_id,
      type,
      life_fate,
      production_system,
      common_name,
      location,
      scientific_name,
    });

    return res.status(201).json(newPatient);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const CreatePatientValidator = () => [
  body("name").isString().notEmpty(),
  body("birth_date").isString().notEmpty(),
  body("about").optional().isString(),
  body("type").isIn(patientTypeEnum),
  body("production_system").optional().isString(),
  body("life_fate").optional().isString(),
  body("common_name").optional().isString(),
  body("scientific_name").optional().isString(),
  body("location").optional().isString(),
];
