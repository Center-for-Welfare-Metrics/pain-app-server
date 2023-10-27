import { Request, Response } from "express";
import { DeleteEpisodeUseCase } from "./deleteEpisodeUseCase";
import { param } from "express-validator";
import { EpisodePermissionValidate } from "@utils/episode/validate";

type DeleteEpisodeByIdParams = {
  episode_id: string;
};

export const DeleteEpisodeController = async (
  request: Request<DeleteEpisodeByIdParams>,
  response: Response
) => {
  const { episode_id } = request.params;

  await DeleteEpisodeUseCase({ episode_id });

  return response.sendStatus(200);
};

export const DeleteEpisodeValidator = () => [
  param("episode_id").isMongoId().custom(EpisodePermissionValidate),
];
