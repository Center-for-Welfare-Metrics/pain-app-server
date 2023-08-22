import { Request, Response } from "express";
import { CreateSegmentUseCase } from "./createSegmentUseCase";
import { body } from "express-validator";
import { TrackPermissionValidation } from "@utils/track/validate";

type CreateSegmentRequestBody = {
  track_id: string;
};

export const CreateSegmentController = async (
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

export const CreateSegmentValidator = () => [
  body("track_id")
    .isMongoId()
    .custom(async (track_id, { req }) => {
      const user_id = req.user._id;

      await TrackPermissionValidation(track_id, user_id);
    }),
];
