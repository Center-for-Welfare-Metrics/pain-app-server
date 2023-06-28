import { DeleteEpisodesByPatientIdImplementation } from "@implementations/mongoose/episodes";
import { DeletePatientImplementation } from "@implementations/mongoose/patient";

type DeletePatientUseCaseParams = {
  patient_id: string;
};

export const DeletePatientUseCase = async (
  params: DeletePatientUseCaseParams
) => {
  const { patient_id } = params;

  await DeletePatientImplementation({ patient_id });

  DeleteEpisodesByPatientIdImplementation({ patient_id });

  return;
};
