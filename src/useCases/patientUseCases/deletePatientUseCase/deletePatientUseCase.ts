import { DeleteBookmarkRecordsByPatientIdImplementation } from "@implementations/mongoose/bookmark-patients";
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

  try {
    DeleteEpisodesByPatientIdImplementation({
      patient_id,
    });
  } catch (e) {
    console.error(e);
  }

  try {
    DeleteBookmarkRecordsByPatientIdImplementation({
      patient_id,
    });
  } catch (e) {
    console.error(e);
  }

  return;
};
