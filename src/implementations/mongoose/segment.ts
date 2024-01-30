import { ISegment, SegmentModel } from "@models/segment";

type CreateSegmentFromImportParams = {
  track_id: string;
} & Omit<ISegment, "track_id" | "_id">;

export const CreateSegmentFromImportImplementation = async (
  params: CreateSegmentFromImportParams
) => {
  const { track_id, ...segmentData } = params;

  const segment_created = await SegmentModel.create({
    track_id: track_id,
    ...segmentData,
  });

  return segment_created;
};

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

  const itens = [];

  for (let i = 0; i < 3; i++) {
    itens.push({
      track_id,
    });
  }

  const segments_created = await SegmentModel.create(itens);

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

type UpdateSegmentParams = {
  segment_id: string;
  update: Partial<ISegment>;
};

export const UpdateSegmentImplementation = async (
  params: UpdateSegmentParams
) => {
  const { segment_id, update } = params;

  const segment_updated = await SegmentModel.findByIdAndUpdate(
    segment_id,
    update,
    {
      new: true,
    }
  );

  return segment_updated;
};

type GetSegmentByIdParams = {
  segment_id: string;
};

export const GetSegmentByIdImplementation = async (
  params: GetSegmentByIdParams
) => {
  const { segment_id } = params;

  const segment = await SegmentModel.findById(segment_id);

  return segment;
};

type DeleteSegmentByIdParams = {
  segment_id: string;
};

export const DeleteSegmentByIdImplementation = async (
  params: DeleteSegmentByIdParams
) => {
  const { segment_id } = params;

  const segment_deleted = await SegmentModel.findByIdAndDelete(segment_id);

  return segment_deleted;
};
