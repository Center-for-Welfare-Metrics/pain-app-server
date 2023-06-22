import { Request, Response } from "express";
import { SavePromptUseCase } from "./savePromptUseCase";
import { body } from "express-validator";
import { IAttributesConfig, PromptOptions } from "@models/prompt";
import {
  commonPromptAttributesConfigValidation,
  commonPromptOptionsValidation,
} from "@utils/prompt/validate";

type GenerateCompletionBody = {
  prompt: string;
  options: PromptOptions;
  attributes?: any;
  attributesConfig?: IAttributesConfig;
};

export const SavePromptController = async (
  request: Request<any, any, GenerateCompletionBody>,
  response: Response
) => {
  const { prompt, attributes, options, attributesConfig } = request.body;

  const user_id = request["user"]?._id;

  try {
    const promptCreated = await SavePromptUseCase({
      prompt,
      options: {
        frequency_penalty: options.frequency_penalty,
        presence_penalty: options.presence_penalty,
        temperature: options.temperature,
        top_p: options.top_p,
      },
      attributes,
      user_id,
      attributesConfig,
    });

    return response.status(200).json(promptCreated);
  } catch (error) {
    return response.sendStatus(500);
  }
};

export const SavePromptValidator = () => [
  body("prompt").isString(),
  body("attributes").optional().isObject(),
  body("options").isObject().custom(commonPromptOptionsValidation).optional(),
  body("attributesConfig")
    .optional()
    .isObject()
    .custom(commonPromptAttributesConfigValidation),
];
