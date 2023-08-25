import { Request, Response } from "express";
import { CreateGuestEpisodeUseCase } from "./createGuestEpisodeUseCase";

export const CreateGuestEpisodeController = async (
  _: Request,
  response: Response
) => {
  try {
    const episode = await CreateGuestEpisodeUseCase();

    return response.status(201).json(episode);
  } catch (error) {
    return response.sendStatus(500);
  }
};
