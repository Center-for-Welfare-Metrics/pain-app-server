import { EpisodeModel } from "@models/episode";
import { getSortObject } from "@utils/sortBy";

type CreateEpisodeParams = {
  name: string;
  patient_id: string;
  creator_id: string;
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

type GetEpisodesListParams = {
  patient_id: string;
  page: number;
  limit: number;
};

export const GetEpisodesListImplementation = async (
  params: GetEpisodesListParams
) => {
  const { patient_id, page, limit } = params;

  const episodes = await EpisodeModel.find({ patient_id })
    .limit(limit)
    .skip(page * limit)
    .sort({ createdAt: -1 });

  return episodes;
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

  const patients = await EpisodeModel.find({ patient_id })
    .sort(sortObject)
    .limit(limit)
    .skip(page * limit);

  return patients;
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
