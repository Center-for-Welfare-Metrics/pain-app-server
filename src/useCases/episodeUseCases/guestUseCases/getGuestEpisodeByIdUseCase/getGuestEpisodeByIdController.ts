import { Request, Response } from "express";

import { param } from "express-validator";
import { GuestEpisodePermissionValidate } from "@utils/episode/validate";
import { GetEpisodeByIdUseCase } from "../../getEpisodeById/getEpisodeByIdUseCase";

type GetGuestEpisodeByIdParams = {
  episode_id: string;
};

export const GetGuestEpisodeByIdController = async (
  request: Request<GetGuestEpisodeByIdParams>,
  response: Response
) => {
  const { episode_id } = request.params;

  const episode = await GetEpisodeByIdUseCase({ episode_id });

  if (episode) {
    return response.status(200).json(episode);
  }

  return response.sendStatus(404);
};

export const GetGuestEpisodeByIdValidator = () => [
  param("episode_id").isMongoId().custom(GuestEpisodePermissionValidate),
];
