import { UpdateDiscussionTextImplementation } from "@implementations/mongoose/discussion";

type UpdateDiscussionTextUseCaseProps = {
  discussion_id: string;
  text: any;
};

export const UpdateDiscussionTextUseCase = async (
  params: UpdateDiscussionTextUseCaseProps
) => {
  const { discussion_id, text } = params;

  const discussion = await UpdateDiscussionTextImplementation({
    discussion_id,
    text,
  });

  return discussion;
};
