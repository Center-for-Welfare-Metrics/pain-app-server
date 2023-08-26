import { Request, Response } from "express";
import { param } from "express-validator";
import { TrackGuestPermissionValidateAsync } from "@utils/track/validate";
import { GetSegmentByIdImplementation } from "@implementations/mongoose/segment";
import { DeleteSegmentUseCase } from "@useCases/segmentUseCases/deleteSegmentUseCase/deleteSegmentUseCase";

type DeleteSegmentRequestParams = {
  segment_id: string;
};

export const DeleteSegmentGuestController = async (
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

export const DeleteSegmentGuestValidator = () => [
  param("segment_id")
    .isMongoId()
    .custom(async (segment_id, { req }) => {
      const segment = await GetSegmentByIdImplementation({ segment_id });

      if (!segment) {
        throw new Error("Segment not found");
      }

      const track_id = segment.track_id.toString();

      await TrackGuestPermissionValidateAsync(track_id);
    }),
];
