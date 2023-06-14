import { Request, Response } from "express";
import { SavePromptUseCase } from "./savePromptUseCase";
import { body } from "express-validator";

type GenerateCompletionBody = {
  prompt: string;
  attributes?: any;
};

export const SavePromptController = async (
  request: Request<any, any, GenerateCompletionBody>,
  response: Response
) => {
  const { prompt, attributes } = request.body;

  const user_id = request["user"]?._id;

  try {
    const promptCreated = await SavePromptUseCase({
      prompt,
      attributes,
      user_id,
    });

    response.status(200).json(promptCreated);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const SavePromptValidator = () => [
  body("prompt").isString(),
  body("attributes").optional().isObject(),
];
