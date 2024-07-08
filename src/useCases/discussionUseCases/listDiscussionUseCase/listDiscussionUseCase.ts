import {
  CountDiscussionImplementation,
  ListDiscussionImplementation,
} from "@implementations/mongoose/discussion";
import { MakePagination } from "@utils/pagination";

type ListDiscussionUseCaseParams = {
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  parent_id: string | null;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListDiscussionUseCase = async (
  params: ListDiscussionUseCaseParams
) => {
  const {
    patient_id,
    limit,
    page,
    sortBy,
    episode_id,
    parent_id,
    segment_id,
    track_id,
  } = params;

  const discussionComments = await ListDiscussionImplementation({
    patient_id,
    episode_id,
    segment_id,
    track_id,
    parent_id,
    limit,
    page,
    sortBy,
  });

  const discussionCount = await CountDiscussionImplementation({
    patient_id,
    episode_id,
    track_id,
    segment_id,
    parent_id,
  });

  return MakePagination({
    data: discussionComments,
    page,
    limit,
    totalCount: discussionCount,
  });
};
