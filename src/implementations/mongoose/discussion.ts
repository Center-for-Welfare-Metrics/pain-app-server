import { DiscussionModel } from "@models/discussion";
import { getSortObject } from "@utils/sortBy";

type CreateDiscussionImplementation = {
  path: string;
  user_id: string;
  text: any;
  title?: string;
  patient_id?: string;
  episode_id?: string;
  track_id?: string;
  segment_id?: string;
  parent_id: string | null;
};

export const createDiscussionImplementation = async (
  discussion: CreateDiscussionImplementation
) => {
  const {
    path,
    user_id,
    text,
    patient_id,
    episode_id,
    parent_id,
    title,
    track_id,
    segment_id,
  } = discussion;

  const discussionCreated = await DiscussionModel.create({
    path,
    user_id,
    text,
    title,
    parent_id,
    patient_id,
    episode_id,
    track_id,
    segment_id,
  });

  return discussionCreated;
};

type UpdateDiscussionTextImplementation = {
  discussion_id: string;
  text: string;
};

export const UpdateDiscussionTextImplementation = async (
  params: UpdateDiscussionTextImplementation
) => {
  const { discussion_id, text } = params;

  const discussion = await DiscussionModel.findByIdAndUpdate(
    discussion_id,
    { text },
    { new: true }
  );

  return discussion;
};

type DeleteDiscussionImplementation = {
  discussion_id: string;
};

export const DeleteDiscussionImplementation = async (
  params: DeleteDiscussionImplementation
) => {
  const { discussion_id } = params;

  const discussion = await DiscussionModel.findByIdAndUpdate(
    discussion_id,
    { deletedAt: new Date() },
    { new: true }
  );

  return discussion;
};

type ListDiscussionImplementation = {
  limit: number;
  page: number;
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  parent_id: string | null;
  sortBy?: string;
};

export const ListDiscussionImplementation = async (
  params: ListDiscussionImplementation
) => {
  const {
    episode_id,
    patient_id,
    limit,
    page,
    sortBy,
    parent_id,
    segment_id,
    track_id,
  } = params;

  const sortObject = getSortObject(sortBy);

  const discussions = await DiscussionModel.find({
    patient_id,
    episode_id,
    parent_id,
    track_id,
    segment_id,
  })
    .populate([
      {
        path: "user",
        select: "name",
      },
      {
        path: "replies_count",
      },
    ])
    .sort(sortObject)
    .limit(limit)
    .skip(page * limit);
  return discussions;
};

type CountDiscussionImplementation = {
  parent_id: string | null;
  patient_id: string | null;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
};

export const CountDiscussionImplementation = async (
  params: CountDiscussionImplementation
) => {
  const { patient_id, episode_id, parent_id, segment_id, track_id } = params;

  const count = await DiscussionModel.countDocuments({
    parent_id,
    patient_id,
    episode_id,
    track_id,
    segment_id,
  });

  return count;
};

type GetDiscussionByIdImplementation = {
  discussion_id: string;
};

export const GetDiscussionByIdImplementation = async (
  params: GetDiscussionByIdImplementation
) => {
  const { discussion_id } = params;

  const discussion = await DiscussionModel.findById(discussion_id).populate([
    {
      path: "user",
      select: "name",
    },
    {
      path: "replies_count",
    },
  ]);

  return discussion;
};
