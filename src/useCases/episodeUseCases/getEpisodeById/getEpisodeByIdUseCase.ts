import { GetEpisodeById } from "@implementations/mongoose/episodes";

type GetEpisodeByIdUseCaseParams = {
  episode_id: string;
};

export const GetEpisodeByIdUseCase = (params: GetEpisodeByIdUseCaseParams) => {
  const { episode_id } = params;

  const episode = GetEpisodeById({ episode_id });

  return episode;
};
