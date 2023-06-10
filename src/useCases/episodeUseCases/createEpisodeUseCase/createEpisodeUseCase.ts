import {
  CountEpisodesImplementation,
  CreateEpisodeImplementation,
} from "@implementations/mongoose/episodes";

type CreateEpisodeUseCaseParams = {
  patient_id: string;
  user_id: string;
};

export const CreateEpisodeUseCase = async (
  params: CreateEpisodeUseCaseParams
) => {
  const { patient_id, user_id } = params;

  const episodesCount = await CountEpisodesImplementation({ patient_id });

  const episode_name = `Episode ${episodesCount + 1}`;

  const episode_create = await CreateEpisodeImplementation({
    name: episode_name,
    patient_id,
    creator_id: user_id,
  });

  return episode_create;
};
