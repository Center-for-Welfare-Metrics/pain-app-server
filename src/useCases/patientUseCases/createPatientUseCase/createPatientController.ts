import { Request, Response } from "express";
import { CreatePatientUseCase } from "./createPatientUseCase";

export const CreatePatientController = async (
  req: Request<any, any, any>,
  res: Response
) => {
  const user_id = req["user"]?._id;

  try {
    const newPatient = await CreatePatientUseCase({
      user_id,
    });

    return res.status(201).json(newPatient);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const CreatePatientValidator = () => [];
