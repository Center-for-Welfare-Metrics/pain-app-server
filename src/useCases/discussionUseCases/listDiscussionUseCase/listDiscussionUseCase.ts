import {
  CountDiscussionImplementation,
  ListDiscussionImplementation,
} from "@implementations/mongoose/discussion";
import { MakePagination } from "@utils/pagination";

type ListDiscussionUseCaseParams = {
  patient_id: string | null;
  episode_id: string | null;
  parent_id: string | null;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListDiscussionUseCase = async (
  params: ListDiscussionUseCaseParams
) => {
  const { patient_id, limit, page, sortBy, episode_id, parent_id } = params;

  const discussionComments = await ListDiscussionImplementation({
    patient_id,
    episode_id,
    parent_id,
    limit,
    page,
    sortBy,
  });

  const discussionCount = await CountDiscussionImplementation({
    episode_id,
    patient_id,
    parent_id,
  });

  return MakePagination({
    data: discussionComments,
    page,
    limit,
    totalCount: discussionCount,
  });
};
