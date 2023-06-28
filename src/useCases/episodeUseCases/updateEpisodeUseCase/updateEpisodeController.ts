import { Request, Response } from "express";
import { UpdateEpisodeUseCase } from "./updateEpisodeUSeCase";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body, param } from "express-validator";

type UpdateEpisodeRequestParams = {
  episode_id: string;
};

type UpdateEpisodeRequestBody = {
  name?: string;
  location?: string;
  diagnosis?: string;
  start_date?: string;
  comment?: string;
};

export const UpdateEpisodeController = async (
  request: Request<UpdateEpisodeRequestParams, any, UpdateEpisodeRequestBody>,
  response: Response
) => {
  const { episode_id } = request.params;

  const { name, location, diagnosis, start_date, comment } = request.body;
  try {
    const episode_updated = await UpdateEpisodeUseCase({
      episode_id,
      update: CleanUpUndefined({
        name,
        comment,
        diagnosis,
        location,
        start_date,
      }),
    });

    return response.status(200).json(episode_updated);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const UpdateEpisodeValidator = () => [
  param("episode_id").isMongoId(),
  body("name").optional().isString(),
  body("location").optional().isString(),
  body("diagnosis").optional().isString(),
  body("start_date").optional().isString(),
  body("comment").optional().isString(),
];
