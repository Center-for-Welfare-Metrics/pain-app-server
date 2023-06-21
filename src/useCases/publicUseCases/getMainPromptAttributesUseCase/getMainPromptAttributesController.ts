import { Request, Response } from "express";
import { GetMainPromptAttributesUseCase } from "./getMainPromptAttributesUseCase";

export const getMainPromptAttributesController = async (
  req: Request,
  res: Response
) => {
  try {
    const mainPromptAttributes = await GetMainPromptAttributesUseCase();
    return res.status(200).json(mainPromptAttributes);
  } catch (err) {
    return res.sendStatus(500);
  }
};
