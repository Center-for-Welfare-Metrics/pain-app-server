import { Request, Response } from "express";
import { body } from "express-validator";
import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";
import { CreateTrackUseCase } from "@useCases/trackUseCases/createTrackUseCase/createTrackUseCase";
import { GuestEpisodePermissionValidate } from "@utils/episode/validate";

type CreateTrackGuestRequestBody = {
  episode_id: string;
};

export const CreateTrackGuestController = async (
  request: Request<any, any, CreateTrackGuestRequestBody>,
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

export const CreateTrackGuestValidator = () => [
  body("episode_id").isMongoId().custom(GuestEpisodePermissionValidate),
];
