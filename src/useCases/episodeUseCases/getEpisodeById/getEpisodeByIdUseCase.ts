import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";

type GetEpisodeByIdUseCaseParams = {
  episode_id: string;
};

export const GetEpisodeByIdUseCase = async (
  params: GetEpisodeByIdUseCaseParams
) => {
  const { episode_id } = params;

  const episode = await GetEpisodeByIdImplementation({ episode_id });

  return episode;
};
