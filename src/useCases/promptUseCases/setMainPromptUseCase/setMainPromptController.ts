import { Request, Response } from "express";
import { SetMainPromptUseCase } from "./setMainPromptUseCase";
import { param } from "express-validator";

type setMainPromptRequestParams = {
  prompt_id: string;
};

export const setMainPromptController = async (
  request: Request<setMainPromptRequestParams>,
  response: Response
) => {
  const { prompt_id } = request.params;
  try {
    await SetMainPromptUseCase({ prompt_id });

    return response.status(200).json({ message: "Prompt set as main" });
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const setMainPromptValidator = () => [
  param("prompt_id").isMongoId().notEmpty(),
];
