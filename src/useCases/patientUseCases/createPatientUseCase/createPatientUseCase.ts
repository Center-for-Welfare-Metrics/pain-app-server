import {
  CountPatientsImplementation,
  CreatePatientImplementation,
} from "@implementations/mongoose/patient";

type CreatePatientUseCaseParams = {
  user_id: string;
};

export const CreatePatientUseCase = async (
  params: CreatePatientUseCaseParams
) => {
  const { user_id } = params;

  const patientsCount = await CountPatientsImplementation({ user_id });

  const newPatient = await CreatePatientImplementation({
    user_id,
    name: `Subject ${patientsCount + 1}`,
    type: "human",
  });

  return newPatient;
};
