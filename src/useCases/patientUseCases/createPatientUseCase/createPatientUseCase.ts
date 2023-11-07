import { CreatePatientImplementation } from "@implementations/mongoose/patient";
import { PatientTypeEnum } from "@models/patient";

type CreatePatientUseCaseParams = {
  name: string;
  birth_date: string;
  user_id: string;
  type: PatientTypeEnum;
  production_system?: string;
  life_fate?: string;
  about?: string;
  location?: string;
  common_name?: string;
  scientific_name?: string;
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
    common_name,
    scientific_name,
    location,
  } = params;

  const newPatient = await CreatePatientImplementation({
    name,
    birth_date,
    about,
    user_id,
    life_fate,
    production_system,
    type,
    common_name,
    scientific_name,
    location,
  });

  return newPatient;
};
