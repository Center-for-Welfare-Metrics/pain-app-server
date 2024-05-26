import { RemoveBookMarkImplementation } from "@implementations/mongoose/episodes";

type RemoveEpisodeFromBookMarkUseCaseParams = {
  episode_id: string;
  user_id: string;
};

export const RemoveEpisodeFromBookMarkUseCase = async (
  params: RemoveEpisodeFromBookMarkUseCaseParams
) => {
  const { episode_id, user_id } = params;

  await RemoveBookMarkImplementation({
    episode_id,
    user_id,
  });

  return;
};
