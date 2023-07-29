import { Request, Response } from "express";
import { CreateTrackUseCase } from "./createTrackUseCase";
import { body } from "express-validator";
import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";

type CreateTrackRequestBody = {
  episode_id: string;
};

export const CreateTrackController = async (
  request: Request<any, any, CreateTrackRequestBody>,
  response: Response
) => {
  const { episode_id } = request.body;

  try {
    const Track = await CreateTrackUseCase({
      episode_id,
    });

    return response.status(201).json(Track);
  } catch (error) {
    if (process.env.ENV === "DEV") {
      return response.status(500).json({ error: error.message });
    } else {
      return response.sendStatus(500);
    }
  }
};

export const CreateTrackValidator = () => [
  body("episode_id")
    .isMongoId()
    .custom(async (episode_id, { req }) => {
      const user_id = req["user"]._id;

      const episode = await GetEpisodeByIdImplementation({ episode_id });

      if (!episode) {
        throw new Error("Episode not found");
      }

      if (episode.creator_id.toString() !== user_id) {
        throw new Error("Episode not found");
      }
    }),
];
