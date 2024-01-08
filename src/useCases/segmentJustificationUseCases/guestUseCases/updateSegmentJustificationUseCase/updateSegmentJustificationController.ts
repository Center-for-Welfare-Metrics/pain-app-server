import { GetJustificationByIdImplementation } from "@implementations/mongoose/segment-justification";
import { GetSegmentByIdImplementation } from "@implementations/mongoose/segment";
import { TrackGuestPermissionValidateAsync } from "@utils/track/validate";
import { param } from "express-validator";

export const UpdateSegmentJustificationValidatorGuest = () => [
  param("justification_id")
    .isMongoId()
    .custom(async (justification_id, { req }) => {
      const justification = await GetJustificationByIdImplementation({
        justification_id,
      });

      const segment_id = justification.segment_id;

      const segment = await GetSegmentByIdImplementation({ segment_id });

      if (!segment) {
        throw new Error("Segment not found");
      }

      const track_id = segment.track_id.toString();

      await TrackGuestPermissionValidateAsync(track_id);
    }),
];
