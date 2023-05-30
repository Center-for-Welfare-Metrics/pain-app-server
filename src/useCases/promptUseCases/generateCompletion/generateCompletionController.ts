import { Request, Response } from "express";
import { GenerateCompletionUseCase } from "./generateCompletionUseCase";
import { body } from "express-validator";

type GenerateCompletionBody = {
  prompt: string;
};

export const GenerateCompletionController = async (
  request: Request<any, any, GenerateCompletionBody>,
  response: Response
) => {
  const { prompt } = request.body;

  try {
    const completion = await GenerateCompletionUseCase({
      prompt,
    });

    response.status(201).json(completion);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const GenerateCompletionValidator = () => [body("prompt").isString()];
