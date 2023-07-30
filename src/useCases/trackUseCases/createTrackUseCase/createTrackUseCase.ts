import { InitializeTrackImplementation } from "@implementations/mongoose/segment";
import {
  CountTracksImplementation,
  CreateTrackImplementation,
} from "@implementations/mongoose/track";

type CreateTrackUseCaseParams = {
  episode_id: string;
};

export const CreateTrackUseCase = async (params: CreateTrackUseCaseParams) => {
  const { episode_id } = params;

  const tracksCount = await CountTracksImplementation({ episode_id });

  const track_name = `New Track ${tracksCount + 1}`;

  const track_created = await CreateTrackImplementation({
    episode_id,
    name: track_name,
  });

  const segments_created = await InitializeTrackImplementation({
    track_id: track_created._id.toString(),
  });

  const track = track_created.toJSON();

  return { ...track, segments: segments_created };
};
