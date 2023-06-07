import { Request, Response } from "express";
import { GetPromptUseCase } from "./getPromptUseCase";
import { body } from "express-validator";

type GetPromptRequestParams = {
  prompt_id: string;
};

export const GetPromptController = async (
  request: Request<GetPromptRequestParams>,
  response: Response
) => {
  const { prompt_id } = request.params;

  const user_id = request["user"]._id;

  try {
    const prompt = await GetPromptUseCase({
      user_id,
      prompt_id,
    });

    return response.status(200).json(prompt);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
