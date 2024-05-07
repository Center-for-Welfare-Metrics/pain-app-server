import {
  AddToBookMarkImplementation,
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

  await AddToBookMarkImplementation({
    patient_id,
    user_id,
  });

  const patient = await GetPatientByIdImplementation(patient_id);

  return patient;
};
