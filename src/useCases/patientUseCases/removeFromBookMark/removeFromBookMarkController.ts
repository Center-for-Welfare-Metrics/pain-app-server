import { Request, Response } from "express";
import { RemoveFromBookMarkUseCase } from "./removeFromBookMarkUseCase";

type AddToBookMarkRequestBody = {
  patient_id: string;
};

export const RemoveFromBookMarkController = async (
  req: Request<any, any, AddToBookMarkRequestBody>,
  res: Response
) => {
  const { patient_id } = req.body;

  const user_id = req["user"]?._id;

  try {
    await RemoveFromBookMarkUseCase({
      user_id,
      patient_id,
    });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
