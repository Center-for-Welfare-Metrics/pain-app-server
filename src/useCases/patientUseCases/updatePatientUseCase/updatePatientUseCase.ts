import {
  GetPatientByIdImplementation,
  UpdatePatientImplementation,
} from "@implementations/mongoose/patient";

type UpdatePatientUseCaseParams = {
  patient_id: string;
  update: {
    name?: string;
    birth_date?: string;
    about?: string;
    location?: string;
    common_name?: string;
    scientific_name?: string;
  };
};

export const UpdatePatientUseCase = async (
  params: UpdatePatientUseCaseParams
) => {
  const { patient_id, update } = params;

  const patient = await GetPatientByIdImplementation(patient_id);

  const updated = await UpdatePatientImplementation({
    patient_id,
    update,
  });

  return updated;
};
