import { Request, Response } from "express";
import { ExportEpisodeUseCase } from "./exportEpisodeUseCase";
import { EpisodePermissionValidate } from "@utils/episode/validate";
import { param } from "express-validator";

type UpdateEpisodeRequestParams = {
  episode_id: string;
};

export const ExportEpisodeController = async (
  request: Request<UpdateEpisodeRequestParams, any, any>,
  response: Response
) => {
  const { episode_id } = request.params;

  try {
    const episode = await ExportEpisodeUseCase({
      id: episode_id,
    });

    return response.status(200).json(episode);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const ExportEpisodeValidator = () => [
  param("episode_id").isMongoId().custom(EpisodePermissionValidate),
];
