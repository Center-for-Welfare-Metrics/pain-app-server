import { createDiscussionImplementation } from "@implementations/mongoose/discussion";

type CreateDiscussionUseCaseParams = {
  user_id: string;
  text: string;
  patient_id?: string;
  episode_id?: string;
  parent_id: string | null;
};

export const CreateDiscussionUseCase = async (
  discussion: CreateDiscussionUseCaseParams
) => {
  const { user_id, text, patient_id, episode_id, parent_id } = discussion;

  if (!episode_id && !patient_id)
    throw new Error("You must provide an episode_id or a patient_id");

  const discussionCreated = await createDiscussionImplementation({
    path: "",
    user_id,
    text,
    patient_id,
    episode_id,
    parent_id,
  });

  return discussionCreated;
};
