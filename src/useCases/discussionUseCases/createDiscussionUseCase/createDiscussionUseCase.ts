import { createDiscussionImplementation } from "@implementations/mongoose/discussion";

type CreateDiscussionUseCaseParams = {
  user_id: string;
  text: string;
  title?: string;
  parent_id: string | null;
  patient_id: string | null;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
};

export const CreateDiscussionUseCase = async (
  discussion: CreateDiscussionUseCaseParams
) => {
  const {
    user_id,
    text,
    patient_id,
    episode_id,
    parent_id,
    title,
    track_id,
    segment_id,
  } = discussion;

  if (!episode_id && !patient_id)
    throw new Error("You must provide an episode_id or a patient_id");

  if (!!title && !!parent_id)
    throw new Error(
      "You can't create a discussion with a title and a parent_id"
    );

  if (!parent_id && !title) {
    throw new Error(
      "You must provide a title to create a discussion without a parent_id"
    );
  }

  if (!!segment_id && !track_id) {
    throw new Error(
      "You must provide a track_id to create a discussion with a segment_id"
    );
  }

  if (!!track_id && !episode_id) {
    throw new Error(
      "You must provide an episode_id to create a discussion with a track_id"
    );
  }

  if (!!episode_id && !patient_id) {
    throw new Error(
      "You must provide a patient_id to create a discussion with an episode_id"
    );
  }

  const discussionCreated = await createDiscussionImplementation({
    path: "",
    user_id,
    text,
    title,
    patient_id,
    episode_id,
    parent_id,
    segment_id,
    track_id,
  });

  return discussionCreated;
};
