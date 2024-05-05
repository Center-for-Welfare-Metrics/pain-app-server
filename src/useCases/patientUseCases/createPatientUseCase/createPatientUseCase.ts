import {
  CountPatientsImplementation,
  CreatePatientImplementation,
} from "@implementations/mongoose/patient";

type CreatePatientUseCaseParams = {
  user_id: string;
  createdAsGuest?: boolean;
};

export const CreatePatientUseCase = async (
  params: CreatePatientUseCaseParams
) => {
  const { user_id, createdAsGuest } = params;

  const patientsCount = await CountPatientsImplementation({ user_id });

  let patientName = `Subject ${patientsCount + 1}`;

  if (createdAsGuest) {
    patientName += " (Created as guest)";
  }

  const newPatient = await CreatePatientImplementation({
    user_id,
    name: patientName,
    type: "human",
  });

  return newPatient;
};
