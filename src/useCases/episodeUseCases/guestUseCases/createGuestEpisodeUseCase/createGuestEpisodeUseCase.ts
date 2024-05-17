import { CreateEpisodeImplementation } from "@implementations/mongoose/episodes";
import { CreateTrackUseCase } from "@useCases/trackUseCases/createTrackUseCase/createTrackUseCase";

export const CreateGuestEpisodeUseCase = async () => {
  const episode_name = "Episode";

  const episode_created = await CreateEpisodeImplementation({
    name: episode_name,
  });

  const episode_id = episode_created._id.toString();

  await CreateTrackUseCase({
    episode_id,
  });

  return episode_created;
};
