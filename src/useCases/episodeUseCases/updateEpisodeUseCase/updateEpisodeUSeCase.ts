import { UpdateEpisodeImplementation } from "@implementations/mongoose/episodes";

type UpdateEpisodeUseCaseParams = {
  episode_id: string;
  update: {
    name?: string;
    location?: string;
    diagnosis?: string;
    start_date?: string;
    comment?: string;
  };
};

export const UpdateEpisodeUseCase = async (
  params: UpdateEpisodeUseCaseParams
) => {
  const { episode_id, update } = params;

  const episode_updated = await UpdateEpisodeImplementation({
    episode_id,
    update,
  });

  return episode_updated;
};
