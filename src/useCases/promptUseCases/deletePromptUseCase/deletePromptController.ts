import { Request, Response } from "express";
import { DeletePromptUseCase } from "./deletePromptUseCase";
import { param } from "express-validator";
import { GetPromptUseCase } from "../getPrompt/getPromptUseCase";
import {
  GetPromptByIdImplementation,
  PromptExistsImplementation,
} from "@implementations/mongoose/prompt";

type DeletePromptRequestParams = {
  prompt_id: string;
};

export const DeletePromptController = async (
  request: Request<DeletePromptRequestParams>,
  response: Response
) => {
  const { prompt_id } = request.params;

  try {
    await DeletePromptUseCase({
      prompt_id,
    });

    return response.sendStatus(200);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const DeletePromptValidator = () => [
  param("prompt_id")
    .isMongoId()
    .custom(async (prompt_id, { req }) => {
      const user_id = req["user"]._id;

      const prompt = await PromptExistsImplementation({
        user_id,
        prompt_id,
      });

      if (!prompt) {
        throw new Error("Prompt not found");
      }
    }),
];
