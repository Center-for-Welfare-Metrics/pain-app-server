import { PatientModel, PatientTypeEnum } from "@models/patient";
import { getSortObject } from "@utils/sortBy";

type CreatePatientImplementationParams = {
  name: string;
  user_id: string;
  type: PatientTypeEnum;
};

export const CreatePatientImplementation = async (
  params: CreatePatientImplementationParams
) => {
  const { name, user_id, type } = params;

  const newPatient = await PatientModel.create({
    name,
    creator_id: user_id,
    type,
  });
  return newPatient;
};

type ListPatientsParams = {
  user_id: string;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListPatientsImplementation = async (
  params: ListPatientsParams
) => {
  const { user_id, limit, page, sortBy } = params;

  const sortObject = getSortObject(sortBy);

  const patients = await PatientModel.find({ creator_id: user_id })
    .sort(sortObject)
    .limit(limit)
    .skip(page * limit)
    .populate("episodes_count");

  return patients;
};

type CountPatientsParams = {
  user_id: string;
};

export const CountPatientsImplementation = async (
  params: CountPatientsParams
) => {
  const { user_id } = params;
  const count = await PatientModel.countDocuments({ creator_id: user_id });

  return count;
};

export const GetPatientByIdImplementation = async (id: string) => {
  const patient = await PatientModel.findById(id);

  if (patient) {
    return patient;
  }

  throw new Error();
};

type UpdatePatientParams = {
  patient_id: string;
  update: {
    name?: string;
    birth_date?: string;
    about?: string;
    type?: PatientTypeEnum;
    production_system?: string | undefined;
    life_fate?: string | undefined;
    common_name?: string;
    scientific_name?: string;
    location?: string;
  };
};

export const UpdatePatientImplementation = async (
  params: UpdatePatientParams
) => {
  const { patient_id, update } = params;

  const patientUpdate = await PatientModel.findByIdAndUpdate(
    patient_id,
    update,
    {
      new: true,
    }
  );

  return patientUpdate;
};

type DeletePatientParams = {
  patient_id: string;
};

export const DeletePatientImplementation = async (
  params: DeletePatientParams
) => {
  const { patient_id } = params;

  const patient = await PatientModel.findByIdAndDelete(patient_id);

  return patient;
};
