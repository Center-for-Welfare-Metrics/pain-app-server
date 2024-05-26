import {
  AddEpisodeToBookMarkImplementation,
  GetBookMarkPatientImplementation,
} from "@implementations/mongoose/episodes";

type AddToBookMarkUseCaseParams = {
  episode_id: string;
  user_id: string;
};

export const AddEpisodeToBookMarkUseCase = async (
  params: AddToBookMarkUseCaseParams
) => {
  const { episode_id, user_id } = params;

  const patientBookMarkFinded = await GetBookMarkPatientImplementation({
    episode_id,
    user_id,
  });

  if (patientBookMarkFinded) {
    return patientBookMarkFinded.episode;
  }

  const bookmarkCreated = await AddEpisodeToBookMarkImplementation({
    episode_id,
    user_id,
  });

  return bookmarkCreated.episode;
};
