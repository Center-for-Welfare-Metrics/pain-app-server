import { AssignePatientAndCreatorToEpiodeImplementation } from "@implementations/mongoose/episodes";
import { CreatePatientUseCase } from "@useCases/patientUseCases/createPatientUseCase/createPatientUseCase";

type AssigneUnsavedEpisodeUseCaseParams = {
  episode_id: string;
  user_id: string;
};

export const AssigneUnsavedEpisodeUseCase = async (
  params: AssigneUnsavedEpisodeUseCaseParams
) => {
  const { episode_id, user_id } = params;

  const newPatient = await CreatePatientUseCase({
    user_id,
    name: "New patient",
    birth_date: new Date().toISOString(),
  });

  const newEpisode = await AssignePatientAndCreatorToEpiodeImplementation({
    episode_id,
    patient_id: newPatient._id.toString(),
    creator_id: user_id,
  });

  return newEpisode;
};
