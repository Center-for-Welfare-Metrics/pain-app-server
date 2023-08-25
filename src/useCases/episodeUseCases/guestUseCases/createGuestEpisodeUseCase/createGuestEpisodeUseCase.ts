import { CreateEpisodeImplementation } from "@implementations/mongoose/episodes";

export const CreateGuestEpisodeUseCase = async () => {
  const episode_name = "Episode";

  const episode_create = await CreateEpisodeImplementation({
    name: episode_name,
  });

  return episode_create;
};
