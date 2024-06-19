import { DiscussionModel } from "@models/discussion";
import { getSortObject } from "@utils/sortBy";

type CreateDiscussionImplementation = {
  path: string;
  user_id: string;
  text: string;
  patient_id?: string;
  episode_id?: string;
  parent_id: string | null;
};

export const createDiscussionImplementation = async (
  discussion: CreateDiscussionImplementation
) => {
  const { path, user_id, text, patient_id, episode_id, parent_id } = discussion;

  const discussionCreated = await DiscussionModel.create({
    path,
    user_id,
    text,
    patient_id,
    episode_id,
    parent_id,
  });

  return discussionCreated;
};

type ListDiscussionImplementation = {
  limit: number;
  page: number;
  episode_id: string | null;
  patient_id: string | null;
  sortBy?: string;
};

export const ListDiscussionImplementation = async (
  params: ListDiscussionImplementation
) => {
  const { episode_id, patient_id, limit, page, sortBy } = params;

  const sortObject = getSortObject(sortBy);

  const discussions = await DiscussionModel.find({
    episode_id,
    patient_id,
  })
    .sort(sortObject)
    .limit(limit)
    .skip(page * limit);

  return discussions;
};

type CountDiscussionImplementation = {
  patient_id: string | null;
  episode_id: string | null;
};

export const CountDiscussionImplementation = async (
  params: CountDiscussionImplementation
) => {
  const { patient_id, episode_id } = params;

  const count = await DiscussionModel.countDocuments({
    patient_id,
    episode_id,
  });

  return count;
};
