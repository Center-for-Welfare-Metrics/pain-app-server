import { Request, Response } from "express";
import { param } from "express-validator";
import { TrackPermissionValidate } from "@utils/track/validate";
import { DeleteTrackUseCase } from "./deleteTrackUseCase";

type DeleteEpisodeRequestParams = {
  track_id: string;
};

export const DeleteTrackController = async (
  request: Request<DeleteEpisodeRequestParams>,
  response: Response
) => {
  const { track_id } = request.params;

  try {
    const track_deleted = await DeleteTrackUseCase({
      track_id,
    });

    return response.status(200).json(track_deleted);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const DeleteTrackValidator = () => [
  param("track_id").isMongoId().custom(TrackPermissionValidate),
];
