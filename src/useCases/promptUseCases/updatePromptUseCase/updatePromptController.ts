import { Request, Response } from "express";
import { UpdatePromptUseCase } from "./updatePromptUseCase";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body, param } from "express-validator";

type UpdatePromptRequestParams = {
  prompt_id: string;
};

type UpdatePromptRequestBody = {
  title?: string;
  prompt?: string;
  attributes?: any;
};

export const UpdatePromptController = async (
  req: Request<UpdatePromptRequestParams, any, UpdatePromptRequestBody>,
  res: Response
) => {
  const user_id = req["user"]._id;
  const { prompt_id } = req.params;
  const { title, prompt, attributes } = req.body;

  try {
    await UpdatePromptUseCase({
      prompt_id,
      user_id,
      update: CleanUpUndefined<UpdatePromptRequestBody>({
        title,
        prompt,
        attributes,
      }),
    });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdatePromptValidator = () => [
  param("prompt_id").isString(),
  body("title").optional().isString(),
  body("prompt").optional().isString(),
  body("attributes").optional().isObject(),
];
