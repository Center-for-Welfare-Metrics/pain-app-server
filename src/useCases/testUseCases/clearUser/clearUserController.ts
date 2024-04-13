import { Request, Response } from "express";
import { ClearUserUseCase } from "./clearUserUseCase";

export const ClearUserController = async (
  request: Request,
  response: Response
) => {
  const user_id = request["user"]?._id;

  try {
    const newPatient = await ClearUserUseCase({
      user_id,
    });

    return response.status(201).json(newPatient);
  } catch (err) {
    console.log(err);
    return response.sendStatus(500);
  }
};
