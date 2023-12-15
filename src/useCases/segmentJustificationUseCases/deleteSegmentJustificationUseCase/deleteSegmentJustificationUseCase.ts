import { DeleteJustificationByIdImplementation } from "@implementations/mongoose/segment-justification";
import { ISegmentValues } from "@models/segment";

type DeleteJustificationParams = {
  justification_id: string;
};

export const DeleteSegmentJustificationUseCase = async (
  params: DeleteJustificationParams
) => {
  const { justification_id } = params;

  const justification = await DeleteJustificationByIdImplementation({
    justification_id,
  });

  return justification;
};
