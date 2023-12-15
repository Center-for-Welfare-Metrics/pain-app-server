import { UpdateJustificationByIdImplementation } from "@implementations/mongoose/segment-justification";
import { ISegmentValues } from "@models/segment";

type UpdateJustificationParams = {
  justification_id: string;
  update: Partial<{
    title: string;
    type_of_evidence: string;
    description: string;
    sources: string;
    ranking: ISegmentValues;
  }>;
};

export const UpdateSegmentJustificationUseCase = async (
  params: UpdateJustificationParams
) => {
  const { justification_id, update } = params;

  const justification = await UpdateJustificationByIdImplementation({
    justification_id,
    update,
  });

  return justification;
};
