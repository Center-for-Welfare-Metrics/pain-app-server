import { UpdateTrackImplementation } from "@implementations/mongoose/track";
import { ITrackPainType } from "@models/track";

type UpdateTrackUseCaseParams = {
  track_id: string;
  update: {
    name?: string;
    comment?: string;
    pain_type?: ITrackPainType;
  };
};

export const UpdateTrackUseCase = async (params: UpdateTrackUseCaseParams) => {
  const { track_id, update } = params;

  const track_updated = await UpdateTrackImplementation({
    track_id,
    update,
  });

  return track_updated;
};
