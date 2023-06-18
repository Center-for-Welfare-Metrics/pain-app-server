import { Request, Response } from "express";
import { UpdatePromptUseCase } from "./updatePromptUseCase";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body, param } from "express-validator";
import { PromptOptions } from "@models/prompt";
import { commonPromptOptionsValidation } from "@utils/prompt/validate";

type UpdatePromptRequestParams = {
  prompt_id: string;
};

type UpdatePromptRequestBody = {
  title?: string;
  prompt?: string;
  options?: PromptOptions;
  attributes?: any;
};

export const UpdatePromptController = async (
  req: Request<UpdatePromptRequestParams, any, UpdatePromptRequestBody>,
  res: Response
) => {
  const user_id = req["user"]._id;
  const { prompt_id } = req.params;
  const { title, prompt, attributes, options } = req.body;
  try {
    await UpdatePromptUseCase({
      prompt_id,
      user_id,
      update: CleanUpUndefined<UpdatePromptRequestBody>({
        title,
        prompt,
        attributes,
        options: options
          ? {
              frequency_penalty: options?.frequency_penalty,
              presence_penalty: options?.presence_penalty,
              temperature: options?.temperature,
              top_p: options?.top_p,
            }
          : undefined,
      }),
    });

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const UpdatePromptValidator = () => [
  param("prompt_id").isString(),
  body("title").optional().isString(),
  body("prompt").optional().isString(),
  body("attributes").optional().isObject(),
  body("options").isObject().custom(commonPromptOptionsValidation).optional(),
];
