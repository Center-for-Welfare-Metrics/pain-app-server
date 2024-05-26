import { EpisodeModel } from "@models/episode";
import { getSortObject } from "@utils/sortBy";
import { DeleteTrackByEpisodeIdImplementation } from "./track";
import mongoose from "mongoose";
import { EpisodesBookmarkModel } from "@models/episodes-bookmark";

type CreateEpisodeFromImportParams = {
  name: string;
  location: string;
  diagnosis: string;
  start_date: string;
  comment: string;
  patient_id: string;
  creator_id: string;
};

export const CreateEpisodeFromImportImplementation = async (
  params: CreateEpisodeFromImportParams
) => {
  const {
    name,
    location,
    diagnosis,
    start_date,
    comment,
    patient_id,
    creator_id,
  } = params;

  const episode_created = await EpisodeModel.create({
    name,
    location,
    diagnosis,
    start_date,
    comment,
    patient_id,
    creator_id,
  });

  return episode_created;
};

type CreateEpisodeParams = {
  name: string;
  patient_id?: string;
  creator_id?: string;
};

export const CreateEpisodeImplementation = async (
  params: CreateEpisodeParams
) => {
  const { name, patient_id, creator_id } = params;

  const episode_created = await EpisodeModel.create({
    name,
    patient_id,
    creator_id,
  });

  return episode_created;
};

type UpdateEpisodeParams = {
  episode_id: string;
  update: {
    name?: string;
    location?: string;
    diagnosis?: string;
    start_date?: string;
    comment?: string;
  };
};

export const UpdateEpisodeImplementation = async (
  params: UpdateEpisodeParams
) => {
  const { episode_id, update } = params;

  const episode_updated = await EpisodeModel.findByIdAndUpdate(
    episode_id,
    update,
    { new: true }
  );

  return episode_updated;
};

type ListEpisodesParams = {
  patient_id: string;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListEpisodesImplementation = async (
  params: ListEpisodesParams
) => {
  const { patient_id, limit, page, sortBy } = params;

  const sortObject = getSortObject(sortBy);

  const episodes = await EpisodeModel.find({ patient_id })
    .sort(sortObject)
    .limit(limit)
    .skip(page * limit)
    .populate("tracks_count")
    .populate("bookmarked");

  return episodes;
};

type CountEpisodesParams = {
  patient_id: string;
};

export const CountEpisodesImplementation = async (
  params: CountEpisodesParams
) => {
  const { patient_id } = params;

  const count = await EpisodeModel.countDocuments({ patient_id });

  return count;
};

type GetEpisodeByIdParams = {
  episode_id: string;
};

export const GetEpisodeByIdImplementation = async (
  params: GetEpisodeByIdParams
) => {
  const { episode_id } = params;

  const episode = await EpisodeModel.findById(episode_id).populate("patient");

  return episode;
};

type DeleteEpisodesByPatientIdParams = {
  patient_id: string;
};

export const DeleteEpisodesByPatientIdImplementation = async (
  params: DeleteEpisodesByPatientIdParams
) => {
  const { patient_id } = params;

  const allEpisodesToDelete = await EpisodeModel.find({ patient_id });

  for (const episode of allEpisodesToDelete) {
    DeleteTrackByEpisodeIdImplementation({
      episode_id: episode._id.toString(),
    });
    episode.deleteOne();
  }

  return;
};

type AssignePatientAndCreatorToEpiodeParams = {
  episode_id: string;
  patient_id: string;
  creator_id: string;
};

export const AssignePatientAndCreatorToEpiodeImplementation = async (
  params: AssignePatientAndCreatorToEpiodeParams
) => {
  const { episode_id, patient_id, creator_id } = params;

  const newEpisode = await EpisodeModel.findByIdAndUpdate(
    episode_id,
    { patient_id, creator_id },
    { new: true }
  ).populate("patient");

  return newEpisode;
};

type DeleteEpisodeByIdParams = {
  episode_id: string;
};

export const DeleteEpisodeByIdImplementation = async (
  params: DeleteEpisodeByIdParams
) => {
  const { episode_id } = params;

  const episode = await EpisodeModel.findByIdAndDelete(episode_id);

  return episode;
};

type FullExportEpisodeParams = {
  episode_id: string;
};

export const FullExportEpisodeImplementation = async (
  params: FullExportEpisodeParams
) => {
  const { episode_id } = params;

  const episode = (await EpisodeModel.findById(episode_id)).populate([
    {
      path: "tracks",
      populate: {
        path: "segments",
        populate: {
          path: "justifications",
        },
      },
    },
    {
      path: "patient",
    },
  ]);

  return episode;
};

type ListSuggestionEpisodesParams = {
  limit: number;
  page: number;
  user_id: string;
  sortBy?: string;
};

type AddToBookMarkImplementation = {
  episode_id: string;
  user_id: string;
};

export const AddEpisodeToBookMarkImplementation = async (
  params: AddToBookMarkImplementation
) => {
  const { episode_id, user_id } = params;

  const bookmarkCreated = await EpisodesBookmarkModel.create({
    episode_id: episode_id,
    user_id: user_id,
  });

  await bookmarkCreated.populate([
    {
      path: "episode",
      populate: {
        path: "tracks_count",
      },
    },
  ]);

  return bookmarkCreated;
};

type GetEpisodeOnBookMark = {
  episode_id: string;
  user_id: string;
};

export const GetBookMarkPatientImplementation = async (
  params: GetEpisodeOnBookMark
) => {
  const { episode_id, user_id } = params;

  const bookmarkedEpisode = await EpisodesBookmarkModel.findOne({
    episode_id,
    user_id,
  }).populate([
    {
      path: "episode",
      populate: {
        path: "tracks_count",
      },
    },
  ]);

  return bookmarkedEpisode;
};

export const ListEpisodesSuggestionImplementation = async (
  params: ListSuggestionEpisodesParams
) => {
  const { limit, page, sortBy, user_id } = params;

  const sortObject = getSortObject(sortBy, {
    isAggregation: true,
  });

  const userObjectId =
    mongoose.mongo.BSON.ObjectId.createFromHexString(user_id);

  const episodes = await EpisodeModel.aggregate([
    {
      $match: {
        creator_id: {
          $ne: userObjectId,
        },
      },
    },
    {
      $lookup: {
        from: "episodes_bookmarks",
        foreignField: "episode_id",
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
        from: "tracks",
        localField: "_id",
        foreignField: "episode_id",
        as: "tracks_count",
      },
    },
    {
      $project: {
        name: 1,
        location: 1,
        diagnosis: 1,
        start_date: 1,
        comment: 1,
        patient_id: 1,
        creator_id: 1,
        tracks_count: 1,
        createdAt: 1,
      },
    },
    {
      $addFields: {
        tracks_count: { $size: "$tracks_count" },
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

  return episodes;
};

type CountEpisodesSuggestionParams = {
  user_id: string;
};

export const CountEpisodesSuggestionImplementation = async ({
  user_id,
}: CountEpisodesSuggestionParams) => {
  const userObjectId =
    mongoose.mongo.BSON.ObjectId.createFromHexString(user_id);

  const count = await EpisodeModel.aggregate([
    {
      $match: {
        creator_id: {
          $ne: userObjectId,
        },
      },
    },
    {
      $lookup: {
        from: "episodes_bookmarks",
        foreignField: "episode_id",
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

type RemoveEpisodeBookMarkImplementation = {
  episode_id: string;
  user_id: string;
};

export const RemoveBookMarkImplementation = async (
  params: RemoveEpisodeBookMarkImplementation
) => {
  const { episode_id, user_id } = params;

  const bookmarkedEpisode = await EpisodesBookmarkModel.findOneAndDelete({
    episode_id,
    user_id,
  });

  return bookmarkedEpisode;
};
