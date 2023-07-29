import { DeleteSegmentsByTrackIdImplementation } from "@implementations/mongoose/segment";
import { DeleteTrackImplementation } from "@implementations/mongoose/track";

type DeleteTrackUseCaseParams = {
  track_id: string;
};

export const DeleteTrackUseCase = async (params: DeleteTrackUseCaseParams) => {
  const { track_id } = params;

  const track_deleted = await DeleteTrackImplementation({ track_id });

  DeleteSegmentsByTrackIdImplementation({ track_id });

  return track_deleted;
};
