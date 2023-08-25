import { Request, Response } from "express";
import { GetEpisodeByIdUseCase } from "./getEpisodeByIdUseCase";
import { param } from "express-validator";
import { EpisodePermissionValidate } from "@utils/episode/validate";

type GetEpisodeByIdParams = {
  episode_id: string;
};

export const GetEpisodeByIdController = async (
  request: Request<GetEpisodeByIdParams>,
  response: Response
) => {
  const { episode_id } = request.params;

  const episode = await GetEpisodeByIdUseCase({ episode_id });

  if (episode) {
    return response.status(200).json(episode);
  }

  return response.sendStatus(404);
};

export const GetEpisodeByIdValidator = () => [
  param("episode_id").isMongoId().custom(EpisodePermissionValidate),
];
