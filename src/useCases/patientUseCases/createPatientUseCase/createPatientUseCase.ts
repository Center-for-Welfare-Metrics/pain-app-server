import { CreatePatientImplementation } from "@implementations/mongoose/patient";
import { PatientTypeEnum } from "@models/patient";

type CreatePatientUseCaseParams = {
  name: string;
  birth_date: string;
  user_id: string;
  type: PatientTypeEnum;
  production_system: string | undefined;
  life_fate: string | undefined;
  about?: string;
};

export const CreatePatientUseCase = async (
  params: CreatePatientUseCaseParams
) => {
  const {
    name,
    birth_date,
    about,
    user_id,
    life_fate,
    production_system,
    type,
  } = params;

  const newPatient = await CreatePatientImplementation({
    name,
    birth_date,
    about,
    user_id,
    life_fate,
    production_system,
    type,
  });

  return newPatient;
};
