import { Request, Response } from "express";
import { AddToBookMarkUseCase } from "./addToBookMarkUseCase";

type AddToBookMarkRequestBody = {
  patient_id: string;
};

export const AddToBookMarkController = async (
  req: Request<any, any, AddToBookMarkRequestBody>,
  res: Response
) => {
  const { patient_id } = req.body;

  const user_id = req["user"]?._id;

  try {
    const patientAdded = await AddToBookMarkUseCase({
      user_id,
      patient_id,
    });

    return res.status(201).json(patientAdded);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
