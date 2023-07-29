import { UpdateSegmentImplementation } from "@implementations/mongoose/segment";
import { ISegment } from "@models/segment";

type UpdateSegmentUseCaseParams = {
  segment_id: string;
  update: Partial<ISegment>;
};

export const UpdateSegmentUseCase = async (
  params: UpdateSegmentUseCaseParams
) => {
  const { segment_id, update } = params;

  const segment_updated = await UpdateSegmentImplementation({
    segment_id,
    update,
  });

  return segment_updated;
};
