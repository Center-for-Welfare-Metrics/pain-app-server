import { Request, Response } from "express";
import { GetMeUseCase } from "./getMeUseCase";

export const GetMeController = async (request: Request, response: Response) => {
  const user = request.user;

  try {
    const me = await GetMeUseCase(user.email);
    response.status(201).json(me);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
