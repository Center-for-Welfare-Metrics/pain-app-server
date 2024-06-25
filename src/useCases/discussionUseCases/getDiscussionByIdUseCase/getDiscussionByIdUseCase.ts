import { GetDiscussionByIdImplementation } from "@implementations/mongoose/discussion";

type GetDiscussionByIDUseCaseParams = {
  discussion_id: string;
};

export const GetDiscussionByIDUseCase = async (
  params: GetDiscussionByIDUseCaseParams
) => {
  const { discussion_id } = params;
  const discussion = await GetDiscussionByIdImplementation({
    discussion_id,
  });
  return discussion;
};
