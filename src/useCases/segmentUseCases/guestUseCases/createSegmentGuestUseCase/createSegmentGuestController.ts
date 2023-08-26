import { Request, Response } from "express";
import { body } from "express-validator";
import { TrackGuestPermissionValidate } from "@utils/track/validate";
import { CreateSegmentUseCase } from "@useCases/segmentUseCases/createSegmentUseCase/createSegmentUseCase";

type CreateSegmentRequestBody = {
  track_id: string;
};

export const CreateSegmentGuestController = async (
  request: Request<unknown, unknown, CreateSegmentRequestBody>,
  response: Response
) => {
  const { track_id } = request.body;
  try {
    const segment_created = await CreateSegmentUseCase({
      track_id,
    });

    return response.status(200).json(segment_created);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const CreateSegmentGuestValidator = () => [
  body("track_id").isMongoId().custom(TrackGuestPermissionValidate),
];
