import { DeleteDiscussionImplementation } from "@implementations/mongoose/discussion";

type DeleteDiscussionUseCaseProps = {
  discussion_id: string;
};

export const DeleteDiscussionUseCase = async (
  params: DeleteDiscussionUseCaseProps
) => {
  const { discussion_id } = params;

  const discussion = await DeleteDiscussionImplementation({
    discussion_id,
  });

  return discussion;
};
