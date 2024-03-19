import { Request, Response } from "express";
import { GetMeUseCase } from "./getMeUseCase";

export const GetMeController = async (request: Request, response: Response) => {
  const user_id = request["user"]._id;

  try {
    const me = await GetMeUseCase(user_id);
    response.status(200).json(me);
  } catch (error) {
    return response.sendStatus(500);
  }
};
