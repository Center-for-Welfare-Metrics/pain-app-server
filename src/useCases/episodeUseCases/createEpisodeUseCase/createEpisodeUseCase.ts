import {
  CountEpisodesImplementation,
  CreateEpisodeImplementation,
} from "@implementations/mongoose/episodes";
import { AssigneUnsavedEpisodeUseCase } from "../assigneUnsavedEpisodeUseCase/assigneUnsavedEpisodeUseCase";

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

  const episode_create = await CreateEpisodeImplementation({
    name: episode_name,
    patient_id,
    creator_id: user_id,
  });

  if (!patient_id) {
    const newEpisode = AssigneUnsavedEpisodeUseCase({
      episode_id: episode_create._id.toString(),
      user_id,
    });

    return newEpisode;
  }

  return episode_create;
};
