import { PatientModel } from "@models/patient";

type CreatePatientImplementationParams = {
  name: string;
  birth_date: string;
  user_id: string;
  about?: string;
};

export const CreatePatientImplementation = async (
  params: CreatePatientImplementationParams
) => {
  const { name, birth_date, about, user_id } = params;

  const newPatient = await PatientModel.create({
    name,
    birth_date,
    about,
    user_id,
  });
  return newPatient;
};

export const ListPatientsImplementation = async () => {
  const patients = await PatientModel.find();

  return patients;
};

export const GetPatientByIdImplementation = async (id: string) => {
  const patient = await PatientModel.findById(id);

  if (patient) {
    return patient;
  }

  throw new Error();
};
