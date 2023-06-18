import { Request, Response } from "express";
import { getMainPromptCreatorUseCase } from "./getMainPromptCreatorUseCase";

export const GetMainPromptCreatorController = async (_, response: Response) => {
  try {
    const creator = await getMainPromptCreatorUseCase();

    return response.status(200).json(creator);
  } catch (err) {
    return response.sendStatus(500);
  }
};
