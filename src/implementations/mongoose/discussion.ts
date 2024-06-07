import { DiscussionModel } from "@models/discussion";

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
  episode_id?: string;
  patient_id?: string;
};

export const listDiscussionImplementation = async (
  params: ListDiscussionImplementation
) => {
  const { episode_id, patient_id } = params;

  const discussions = await DiscussionModel.find({
    episode_id,
    patient_id,
  });

  return discussions;
};
