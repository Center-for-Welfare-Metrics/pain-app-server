import { GetJustificationsBySegmentIdImplementation } from "@implementations/mongoose/segment-justification";

type ListSegmentJustificationParams = {
  segment_id: string;
};

export const ListSegmentJustificationUseCase = async (
  params: ListSegmentJustificationParams
) => {
  const { segment_id } = params;

  const justifications = GetJustificationsBySegmentIdImplementation({
    segment_id,
  });

  return justifications;
};
