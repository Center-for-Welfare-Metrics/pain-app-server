import {
  AddToBookMarkImplementation,
  GetBookMarkPatientImplementation,
  GetPatientByIdImplementation,
} from "@implementations/mongoose/patient";

type AddToBookMarkUseCaseParams = {
  patient_id: string;
  user_id: string;
};

export const AddToBookMarkUseCase = async (
  params: AddToBookMarkUseCaseParams
) => {
  const { patient_id, user_id } = params;

  const patientBookMarkFinded = await GetBookMarkPatientImplementation({
    patient_id,
    user_id,
  });

  if (patientBookMarkFinded) {
    return patientBookMarkFinded.patient;
  }

  const bookmarkCreated = await AddToBookMarkImplementation({
    patient_id,
    user_id,
  });

  return bookmarkCreated.patient;
};
