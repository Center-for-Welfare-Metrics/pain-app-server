import { Request, Response } from "express";
import { GetLastUpdatedPromptUseCase } from "./getLastUpdatedPromptUseCase";

export const GetLastUpdatedPromptController = async (
  req: Request,
  res: Response
) => {
  const user_id = req["user"]._id;

  try {
    const prompt = await GetLastUpdatedPromptUseCase({
      user_id,
    });

    return res.status(200).json(prompt);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
