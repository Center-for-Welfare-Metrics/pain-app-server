import { ISegmentValues } from "@models/segment";
import { SegmentJustification } from "@models/segment-justification";

type CreateJustificationParams = {
  title: string;
  type_of_evidence?: string;
  description: string;
  sources: string;
  ranking: ISegmentValues;
  segment_id: string;
};

export const CreateJustificationImplementation = async (
  params: CreateJustificationParams
) => {
  const { title, type_of_evidence, description, sources, ranking, segment_id } =
    params;

  const justification = await SegmentJustification.create({
    title,
    type_of_evidence,
    description,
    sources,
    ranking,
    segment_id,
  });

  return justification;
};

type GetJustificationsBySegmentIdParams = {
  segment_id: string;
};

export const GetJustificationsBySegmentIdImplementation = async (
  params: GetJustificationsBySegmentIdParams
) => {
  const { segment_id } = params;

  const justifications = await SegmentJustification.find({
    segment_id,
  });

  return justifications;
};

type UpdateJustificationByIdParams = {
  justification_id: string;
  update: {
    title?: string;
    type_of_evidence?: string;
    description?: string;
    sources?: string;
    ranking?: ISegmentValues;
  };
};

export const UpdateJustificationByIdImplementation = async (
  params: UpdateJustificationByIdParams
) => {
  const { justification_id, update } = params;

  const justification = await SegmentJustification.findByIdAndUpdate(
    justification_id,
    update,
    { new: true }
  );

  return justification;
};

type DeleteJustificationByIdParams = {
  justification_id: string;
};

export const DeleteJustificationByIdImplementation = async (
  params: DeleteJustificationByIdParams
) => {
  const { justification_id } = params;

  await SegmentJustification.findByIdAndDelete(justification_id);
};

type GetJustificationsCountBySegmentIdParams = {
  segment_id: string;
};

export const GetJustificationsCountBySegmentIdImplementation = async (
  params: GetJustificationsCountBySegmentIdParams
) => {
  const { segment_id } = params;

  const count = await SegmentJustification.countDocuments({
    segment_id,
  });

  return count;
};

type GetJustificationById = {
  justification_id: string;
};

export const GetJustificationByIdImplementation = async (
  params: GetJustificationById
) => {
  const { justification_id } = params;

  const justification = await SegmentJustification.findById(justification_id);

  return justification;
};
