import { Request, Response } from "express";
import { ListSegmentJustificationUseCase } from "./listSegmentJustificationUseCase";
import { param } from "express-validator";
import { GetSegmentByIdImplementation } from "@implementations/mongoose/segment";
import { TrackGuestPermissionValidate } from "@utils/track/validate";

type ListJustificationRequestParams = {
  segment_id: string;
};

export const ListSegmentJustificationController = async (
  request: Request<ListJustificationRequestParams>,
  response: Response
) => {
  const { segment_id } = request.params;

  try {
    const justifications = await ListSegmentJustificationUseCase({
      segment_id,
    });

    return response.status(200).json(justifications);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const ListSegmentJustificationValidator = () => [
  param("segment_id")
    .isMongoId()
    .custom(async (segment_id, { req }) => {
      const user_id = req.user._id;

      const segment = await GetSegmentByIdImplementation({ segment_id });

      if (!segment) {
        throw new Error("Segment not found");
      }

      const track_id = segment.track_id.toString();

      await TrackGuestPermissionValidate(track_id);
    }),
];
