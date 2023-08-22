import { CreateSegmentImplementation } from "@implementations/mongoose/segment";

type CreateSegmentUseCaseParams = {
  track_id: string;
};

export const CreateSegmentUseCase = async (
  params: CreateSegmentUseCaseParams
) => {
  const { track_id } = params;

  const segment_created = await CreateSegmentImplementation({
    track_id,
  });

  return segment_created;
};
