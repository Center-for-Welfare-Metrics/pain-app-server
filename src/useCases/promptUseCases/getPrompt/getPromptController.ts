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

    response.send(201).json(prompt);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
