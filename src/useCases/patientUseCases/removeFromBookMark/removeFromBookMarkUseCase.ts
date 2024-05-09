import {
  AddToBookMarkImplementation,
  GetBookMarkPatientImplementation,
  GetPatientByIdImplementation,
  RemoveBookMarkImplementation,
} from "@implementations/mongoose/patient";

type RemoveFromBookMarkUseCaseParams = {
  patient_id: string;
  user_id: string;
};

export const RemoveFromBookMarkUseCase = async (
  params: RemoveFromBookMarkUseCaseParams
) => {
  const { patient_id, user_id } = params;

  await RemoveBookMarkImplementation({
    patient_id,
    user_id,
  });

  return;
};
