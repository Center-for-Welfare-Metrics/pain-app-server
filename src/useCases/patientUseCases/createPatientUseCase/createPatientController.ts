import { Request, Response } from "express";
import { CreatePatientUseCase } from "./createPatientUseCase";
import { body } from "express-validator";

type CreatePatientRequestBody = {
  name: string;
  birth_date: string;
  about?: string;
};

export const CreatePatientController = async (
  req: Request<any, any, CreatePatientRequestBody>,
  res: Response
) => {
  const { name, birth_date, about } = req.body;

  const user_id = req["user"]?._id;

  try {
    const newPatient = await CreatePatientUseCase({
      name,
      birth_date,
      about,
      user_id,
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
];
