import { Request, Response } from "express";
import { ListPromptsUseCase } from "./listPromptsUseCase";

export const ListPromptsController = async (req: Request, res: Response) => {
  const user_id = req["user"]._id;

  try {
    const prompts = await ListPromptsUseCase({ user_id });

    return res.status(200).json(prompts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
