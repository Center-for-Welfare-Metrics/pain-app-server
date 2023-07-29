import { Request, Response } from "express";
import { CleanUpUndefined } from "@utils/controller-utils";
import { UpdateSegmentUseCase } from "./updateSegmentUseCase";
import { ISegment } from "@models/segment";
import { param } from "express-validator";
import { GetSegmentByIdImplementation } from "@implementations/mongoose/segment";
import { TrackPermissionValidation } from "@utils/track/validate";

type UpdateSegmentRequestParams = {
  segment_id: string;
};

type UpdateSegmentRequestBody = Partial<ISegment>;

export const UpdateSegmentController = async (
  request: Request<UpdateSegmentRequestParams, any, UpdateSegmentRequestBody>,
  response: Response
) => {
  const { segment_id } = request.params;

  const {
    name,
    pain_type,
    comment,
    end,
    estimative_type,
    intensities,
    interventions,
    quality,
    start,
    start_date,
    symptoms,
    track_id,
    time_unit,
  } = request.body;
  try {
    const track_updated = await UpdateSegmentUseCase({
      segment_id,
      update: CleanUpUndefined({
        name,
        pain_type,
        comment,
        end,
        estimative_type,
        intensities,
        interventions,
        quality,
        start,
        start_date,
        symptoms,
        track_id,
        time_unit,
      }),
    });

    return response.status(200).json(track_updated);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const UpdateSegmentValidator = () => [
  param("segment_id")
    .isMongoId()
    .custom(async (segment_id, { req }) => {
      const user_id = req.user._id;

      const segment = await GetSegmentByIdImplementation({ segment_id });

      if (!segment) {
        throw new Error("Segment not found");
      }

      const track_id = segment.track_id.toString();

      TrackPermissionValidation(track_id, user_id);
    }),
];
