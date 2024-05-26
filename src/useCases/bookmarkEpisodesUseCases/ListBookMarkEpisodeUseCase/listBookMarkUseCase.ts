import {
  CountBookmarkEpisodesImplementation,
  ListBookmarkEpisodesImplementation,
} from "@implementations/mongoose/episodes-bookmark";
import { MakePagination } from "@utils/pagination";

type ListPatientsUseCaseParams = {
  user_id: string;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListBookmarkEpisodesUseCase = async (
  params: ListPatientsUseCaseParams
) => {
  const { user_id, limit, page, sortBy } = params;

  const episodes = await ListBookmarkEpisodesImplementation({
    user_id,
    limit,
    page,
    sortBy,
  });

  const episodesCount = await CountBookmarkEpisodesImplementation({ user_id });

  return MakePagination({
    data: episodes,
    page,
    limit,
    totalCount: episodesCount,
  });
};
