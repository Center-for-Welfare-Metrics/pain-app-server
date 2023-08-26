import { Request, Response } from "express";
import { param } from "express-validator";
import { TrackGuestPermissionValidate } from "@utils/track/validate";
import { DeleteTrackUseCase } from "@useCases/trackUseCases/deleteTrackUseCase/deleteTrackUseCase";

type DeleteEpisodeRequestParams = {
  track_id: string;
};

export const DeleteTrackGuestController = async (
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

export const DeleteTrackGuestValidator = () => [
  param("track_id").isMongoId().custom(TrackGuestPermissionValidate),
];
