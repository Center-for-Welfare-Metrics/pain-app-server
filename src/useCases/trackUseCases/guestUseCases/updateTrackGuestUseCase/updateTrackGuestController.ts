import { Request, Response } from "express";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body, param } from "express-validator";
import { ITrackPainType, TrackPainTypeEnum } from "@models/track";
import {
  TrackGuestPermissionValidate,
  TrackPermissionValidate,
} from "@utils/track/validate";
import { UpdateTrackUseCase } from "@useCases/trackUseCases/updateTrackUseCase/updateTrackUseCase";

type UpdateTrackGuestRequestParams = {
  track_id: string;
};

type UpdateTrackGuestRequestBody = {
  name?: string;
  comment?: string;
  pain_type?: ITrackPainType;
};

export const UpdateTrackGuestController = async (
  request: Request<
    UpdateTrackGuestRequestParams,
    any,
    UpdateTrackGuestRequestBody
  >,
  response: Response
) => {
  const { track_id } = request.params;

  const { name, pain_type, comment } = request.body;
  try {
    const track_updated = await UpdateTrackUseCase({
      track_id,
      update: CleanUpUndefined({
        name,
        comment,
        pain_type,
      }),
    });

    return response.status(200).json(track_updated);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const UpdateTrackGuestValidator = () => [
  param("track_id").isMongoId().custom(TrackGuestPermissionValidate),
  body("name").optional().isString(),
  body("comment").optional().isString(),
  body("pain_type").optional().isString().isIn(TrackPainTypeEnum),
];
