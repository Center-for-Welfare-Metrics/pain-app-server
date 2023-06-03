import { CreatePatientImplementation } from "@implementations/mongoose/patient";

type CreatePatientUseCaseParams = {
  name: string;
  birth_date: string;
  user_id: string;
  about?: string;
};

export const CreatePatientUseCase = async (
  params: CreatePatientUseCaseParams
) => {
  const { name, birth_date, about, user_id } = params;

  const newPatient = await CreatePatientImplementation({
    name,
    birth_date,
    about,
    user_id,
  });

  return newPatient;
};
