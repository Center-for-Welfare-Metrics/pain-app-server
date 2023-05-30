import { Request, Response } from "express";
import { GetPromptUseCase } from "./getPromptUseCase";
import { body } from "express-validator";

export const GetPromptController = async (
  request: Request,
  response: Response
) => {
  const user_id = request["user"]._id;

  try {
    const prompt = await GetPromptUseCase({
      user_id,
    });

    return response.status(200).json(prompt);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
