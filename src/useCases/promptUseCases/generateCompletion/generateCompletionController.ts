import { Request, Response } from "express";
import { GenerateCompletionUseCase } from "./generateCompletionUseCase";
import { body } from "express-validator";
import { PromptOptions } from "@models/prompt";
import { commonPromptOptionsValidation } from "@utils/prompt/validate";

type GenerateCompletionBody = {
  prompt: string;
  options: PromptOptions;
};

export const GenerateCompletionController = async (
  request: Request<any, any, GenerateCompletionBody>,
  response: Response
) => {
  const { prompt, options } = request.body;

  try {
    const completion = await GenerateCompletionUseCase({
      prompt,
      options: {
        frequency_penalty: options.frequency_penalty,
        presence_penalty: options.presence_penalty,
        temperature: options.temperature,
        top_p: options.top_p,
      },
    });

    response.status(200).json(completion);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const GenerateCompletionValidator = () => [
  body("prompt").isString(),
  body("options").isObject().custom(commonPromptOptionsValidation),
];
