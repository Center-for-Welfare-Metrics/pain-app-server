import { DeleteSegmentByIdImplementation } from "@implementations/mongoose/segment";

type DeleteSegmentUseCaseParams = {
  segment_id: string;
};

export const DeleteSegmentUseCase = async (
  params: DeleteSegmentUseCaseParams
) => {
  const { segment_id } = params;

  const segment_deleted = await DeleteSegmentByIdImplementation({
    segment_id,
  });

  return segment_deleted;
};
