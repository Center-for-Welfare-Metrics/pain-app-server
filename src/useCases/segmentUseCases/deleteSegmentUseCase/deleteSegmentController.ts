import { Request, Response } from "express";
import { DeleteSegmentUseCase } from "./deleteSegmentUseCase";
import { param } from "express-validator";
import { TrackPermissionValidation } from "@utils/track/validate";
import { GetSegmentByIdImplementation } from "@implementations/mongoose/segment";

type DeleteSegmentRequestParams = {
  segment_id: string;
};

export const DeleteSegmentController = async (
  request: Request<DeleteSegmentRequestParams>,
  response: Response
) => {
  const { segment_id } = request.params;
  try {
    const segment_deleted = await DeleteSegmentUseCase({
      segment_id,
    });

    return response.status(200).json(segment_deleted);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const DeleteSegmentValidator = () => [
  param("segment_id")
    .isMongoId()
    .custom(async (segment_id, { req }) => {
      const user_id = req.user._id;

      const segment = await GetSegmentByIdImplementation({ segment_id });

      if (!segment) {
        throw new Error("Segment not found");
      }

      const track_id = segment.track_id.toString();

      await TrackPermissionValidation(track_id, user_id);
    }),
];
