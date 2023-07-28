import { Request, Response } from "express";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body, param } from "express-validator";
import { UpdateTrackUseCase } from "./updateTrackUseCase";
import { ITrackPainType, TrackPainTypeEnum } from "@models/track";
import { GetTrackByIdImplementation } from "@implementations/mongoose/track";
import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";

type UpdateEpisodeRequestParams = {
  track_id: string;
};

type UpdateEpisodeRequestBody = {
  name?: string;
  comment?: string;
  pain_type?: ITrackPainType;
};

export const UpdateTrackController = async (
  request: Request<UpdateEpisodeRequestParams, any, UpdateEpisodeRequestBody>,
  response: Response
) => {
  const { track_id } = request.params;

  const { name, pain_type, comment } = request.body;
  try {
    const episode_updated = await UpdateTrackUseCase({
      track_id,
      update: CleanUpUndefined({
        name,
        comment,
        pain_type,
      }),
    });

    return response.status(200).json(episode_updated);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const UpdateTrackValidator = () => [
  param("track_id")
    .isMongoId()
    .custom(async (track_id, { req }) => {
      const user_id = req.user._id;

      const track = await GetTrackByIdImplementation({ track_id });

      if (!track) {
        throw new Error("Track not found");
      }

      const episode = await GetEpisodeByIdImplementation({
        episode_id: track.episode_id.toString(),
      });

      if (!episode) {
        throw new Error("Episode not found");
      }

      if (episode.creator_id.toString() !== user_id) {
        throw new Error("Episode not found");
      }
    }),
  body("name").optional().isString(),
  body("comment").optional().isString(),
  body("pain_type").optional().isString().isIn(TrackPainTypeEnum),
];
