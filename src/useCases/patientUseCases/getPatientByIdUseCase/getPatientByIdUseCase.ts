import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";

type GetPatientByIdUseCaseParams = {
  id: string;
  user_id: string;
};

export const GetPatientByIdUseCase = async (
  params: GetPatientByIdUseCaseParams
) => {
  const { id, user_id } = params;

  const patient = await GetPatientByIdImplementation(id);

  if (patient) {
    // if (patient.creator_id.toString() === user_id) {
    return patient;
    // }
  }

  throw new Error("Patient not found");
};
