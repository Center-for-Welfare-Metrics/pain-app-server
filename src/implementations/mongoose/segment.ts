import { SegmentModel } from "@models/segment";

type CreateSegmentParams = {
  track_id: string;
};

export const CreateSegmentImplementation = async (
  params: CreateSegmentParams
) => {
  const { track_id } = params;

  const segment_created = await SegmentModel.create({
    track_id: track_id,
  });

  return segment_created;
};

type InitializeTrackParams = {
  track_id: string;
};

export const InitializeTrackImplementation = async (
  params: InitializeTrackParams
) => {
  const { track_id } = params;

  const segments_created = await SegmentModel.create([
    {
      track_id,
    },
    {
      track_id,
    },
    {
      track_id,
    },
  ]);

  return segments_created;
};

type DeleteSegmentsByTrackIdParams = {
  track_id: string;
};

export const DeleteSegmentsByTrackIdImplementation = async (
  params: DeleteSegmentsByTrackIdParams
) => {
  const { track_id } = params;

  const segments_deleted = await SegmentModel.deleteMany({ track_id });

  return segments_deleted;
};
