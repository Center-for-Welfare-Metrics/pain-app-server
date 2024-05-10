import { PatientModel, PatientTypeEnum } from "@models/patient";
import { getSortObject } from "@utils/sortBy";
import { DeleteEpisodesByPatientIdImplementation } from "./episodes";
import { PatientsBookmarkModel } from "@models/patients-bookmark";
import mongoose from "mongoose";

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
    .populate("episodes_count")
    .populate("bookmarked");

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

type DeletePatientsByUserIdParams = {
  user_id: string;
};

export const DeletePatientsByUserIdImplementation = async (
  params: DeletePatientsByUserIdParams
) => {
  const { user_id } = params;

  const allPatients = await PatientModel.find({ creator_id: user_id });

  for (const patient of allPatients) {
    DeleteEpisodesByPatientIdImplementation({
      patient_id: patient._id.toString(),
    });
    patient.deleteOne();
  }

  return;
};

type AddToBookMarkImplementation = {
  patient_id: string;
  user_id: string;
};

export const AddToBookMarkImplementation = async (
  params: AddToBookMarkImplementation
) => {
  const { patient_id, user_id } = params;

  const bookmarkCreated = await PatientsBookmarkModel.create({
    patient_id: patient_id,
    user_id: user_id,
  });

  await bookmarkCreated.populate([
    {
      path: "patient",
      populate: {
        path: "episodes_count",
      },
    },
  ]);

  return bookmarkCreated;
};

type GetPatientOnBookMark = {
  patient_id: string;
  user_id: string;
};

export const GetBookMarkPatientImplementation = async (
  params: GetPatientOnBookMark
) => {
  const { patient_id, user_id } = params;

  const bookmarkedPatient = await PatientsBookmarkModel.findOne({
    patient_id,
    user_id,
  }).populate([
    {
      path: "patient",
      populate: {
        path: "episodes_count",
      },
    },
  ]);

  return bookmarkedPatient;
};

type ListSuggestionPatientsParams = {
  limit: number;
  page: number;
  user_id: string;
  sortBy?: string;
};

export const ListPatientsSuggestionImplementation = async (
  params: ListSuggestionPatientsParams
) => {
  const { limit, page, sortBy, user_id } = params;

  const sortObject = getSortObject(sortBy, {
    isAggregation: true,
  });

  const userObjectId =
    mongoose.mongo.BSON.ObjectId.createFromHexString(user_id);

  const patients = await PatientModel.aggregate([
    {
      $match: {
        creator_id: {
          $ne: userObjectId,
        },
      },
    },
    {
      $lookup: {
        from: "patients_bookmarks",
        foreignField: "patient_id",
        localField: "_id",
        pipeline: [
          {
            $match: {
              user_id: {
                $eq: userObjectId,
              },
            },
          },
        ],
        as: "matched_records",
      },
    },
    {
      $match: {
        $expr: {
          $eq: [{ $size: "$matched_records" }, 0],
        },
      },
    },
    {
      $lookup: {
        from: "episodes",
        localField: "_id",
        foreignField: "patient_id",
        as: "episodes_count",
      },
    },
    {
      $addFields: {
        episodes_count: { $size: "$episodes_count" },
      },
    },
    {
      $sort: sortObject,
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ]);

  return patients;
};

type CountPatientsSuggestionParams = {
  user_id: string;
};

export const CountPatientsSuggestionImplementation = async ({
  user_id,
}: CountPatientsSuggestionParams) => {
  const userObjectId =
    mongoose.mongo.BSON.ObjectId.createFromHexString(user_id);

  const count = await PatientModel.aggregate([
    {
      $match: {
        creator_id: {
          $ne: userObjectId,
        },
      },
    },
    {
      $lookup: {
        from: "patients_bookmarks",
        foreignField: "patient_id",
        localField: "_id",
        pipeline: [
          {
            $match: {
              user_id: {
                $eq: userObjectId,
              },
            },
          },
        ],
        as: "matched_records",
      },
    },
    {
      $match: {
        $expr: {
          $eq: [{ $size: "$matched_records" }, 0],
        },
      },
    },
    {
      $count: "count",
    },
  ]);

  return count[0].count;
};

type RemoveBookMarkImplementation = {
  patient_id: string;
  user_id: string;
};

export const RemoveBookMarkImplementation = async (
  params: RemoveBookMarkImplementation
) => {
  const { patient_id, user_id } = params;

  const bookmarkedPatient = await PatientsBookmarkModel.findOneAndDelete({
    patient_id,
    user_id,
  });

  return bookmarkedPatient;
};
