import {
  GetPatientByIdImplementation,
  UpdatePatientImplementation,
} from "@implementations/mongoose/patient";

type UpdatePatientUseCaseParams = {
  patient_id: string;
  user_id: string;
  update: {
    name?: string;
    birth_date?: string;
    about?: string;
  };
};

export const UpdatePatientUseCase = async (
  params: UpdatePatientUseCaseParams
) => {
  const { patient_id, user_id, update } = params;

  const patient = await GetPatientByIdImplementation(patient_id);

  if (patient.creator_id.toString() !== user_id) {
    throw new Error();
  }

  const updated = await UpdatePatientImplementation({
    patient_id,
    update,
  });

  return updated;
};
