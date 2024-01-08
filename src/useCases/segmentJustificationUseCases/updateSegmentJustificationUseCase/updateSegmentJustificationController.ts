import { ISegmentValues } from "@models/segment";
import { Request, Response } from "express";
import { UpdateSegmentJustificationUseCase } from "./updateSegmentJustificationUseCase";
import { param } from "express-validator";
import { GetSegmentByIdImplementation } from "@implementations/mongoose/segment";
import { TrackPermissionValidation } from "@utils/track/validate";
import { GetJustificationByIdImplementation } from "@implementations/mongoose/segment-justification";

type CreateJustificationRequestParams = {
  justification_id: string;
};

type CreateJustificationRequestBody = Partial<{
  title: string;
  type_of_evidence: string;
  description: string;
  sources: string;
  ranking: ISegmentValues;
}>;

export const UpdateSegmentJustificationController = async (
  request: Request<
    CreateJustificationRequestParams,
    any,
    CreateJustificationRequestBody
  >,
  response: Response
) => {
  const { justification_id } = request.params;

  const { title, type_of_evidence, description, sources, ranking } =
    request.body;

  try {
    const justification = await UpdateSegmentJustificationUseCase({
      justification_id,
      update: {
        title,
        type_of_evidence,
        description,
        sources,
        ranking,
      },
    });

    return response.status(200).json(justification);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const UpdateSegmentJustificationValidator = () => [
  param("justification_id")
    .isMongoId()
    .custom(async (justification_id, { req }) => {
      const user_id = req.user._id;

      const justification = await GetJustificationByIdImplementation({
        justification_id,
      });

      const segment_id = justification.segment_id;

      const segment = await GetSegmentByIdImplementation({ segment_id });

      if (!segment) {
        throw new Error("Segment not found");
      }

      const track_id = segment.track_id.toString();

      await TrackPermissionValidation(track_id, user_id);
    }),
];
