import {
  CountEpisodesImplementation,
  CreateEpisodeImplementation,
} from "@implementations/mongoose/episodes";
import { AssigneUnsavedEpisodeUseCase } from "../assigneUnsavedEpisodeUseCase/assigneUnsavedEpisodeUseCase";
import { CreateManyTracksImplementation } from "@implementations/mongoose/track";
import { CreateTrackUseCase } from "@useCases/trackUseCases/createTrackUseCase/createTrackUseCase";

type CreateEpisodeUseCaseParams = {
  user_id: string;
  patient_id: string | undefined;
};

export const CreateEpisodeUseCase = async (
  params: CreateEpisodeUseCaseParams
) => {
  const { patient_id, user_id } = params;

  const episodesCount = await CountEpisodesImplementation({ patient_id });

  const episode_name = `Episode ${episodesCount + 1}`;

  const episode_created = await CreateEpisodeImplementation({
    name: episode_name,
    patient_id,
    creator_id: user_id,
  });

  const episode_id = episode_created._id.toString();

  await CreateTrackUseCase({
    episode_id,
  });

  if (!patient_id) {
    const newEpisode = AssigneUnsavedEpisodeUseCase({
      episode_id,
      user_id,
    });

    return newEpisode;
  }

  return episode_created;
};
