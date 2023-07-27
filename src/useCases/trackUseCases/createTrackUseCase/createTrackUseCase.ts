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

  const episode_create = await CreateTrackImplementation({
    episode_id,
    name: track_name,
  });

  return episode_create;
};
