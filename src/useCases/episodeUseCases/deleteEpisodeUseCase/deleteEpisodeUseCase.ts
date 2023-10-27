import { DeleteEpisodeByIdImplementation } from "@implementations/mongoose/episodes";
import { DeleteTrackByEpisodeIdImplementation } from "@implementations/mongoose/track";

type DeleteEpisodeUseCaseParams = {
  episode_id: string;
};

export const DeleteEpisodeUseCase = async (
  params: DeleteEpisodeUseCaseParams
) => {
  const { episode_id } = params;

  await DeleteEpisodeByIdImplementation({ episode_id });

  await DeleteTrackByEpisodeIdImplementation({ episode_id });

  return true;
};
