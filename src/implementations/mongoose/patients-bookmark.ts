import { PatientsBookmarkModel } from "@models/patients-bookmark";
import { getSortObject } from "@utils/sortBy";

type ListBookmarkPatientsParams = {
  user_id: string;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListBookmarkPatientsImplementation = async (
  params: ListBookmarkPatientsParams
) => {
  const { user_id, limit, page, sortBy } = params;

  const sortObject = getSortObject(sortBy);

  const patients = await PatientsBookmarkModel.find({ user_id })
    .sort(sortObject)
    .limit(limit)
    .skip(page * limit)
    .populate([
      {
        path: "patient",
        populate: {
          path: "episodes_count",
        },
      },
    ])
    .populate("discussions_count");

  return patients;
};

type CountBookmarkPatientsParams = {
  user_id: string;
};

export const CountBookmarkPatientsImplementation = async (
  params: CountBookmarkPatientsParams
) => {
  const { user_id } = params;
  const count = await PatientsBookmarkModel.countDocuments({
    user_id,
  });

  return count;
};

type DeleteBookmarkRecordByPatientIdParams = {
  patient_id: string;
};

export const DeleteBookmarkRecordsByPatientIdImplementation = async (
  params: DeleteBookmarkRecordByPatientIdParams
) => {
  const { patient_id } = params;
  await PatientsBookmarkModel.deleteMany({
    patient_id,
  });

  return;
};
