import {
  CountEpisodesSuggestionImplementation,
  ListEpisodesSuggestionImplementation,
} from "@implementations/mongoose/episodes";
import { MakePagination } from "@utils/pagination";

type ListEpisodesSuggestionUseCaseParams = {
  limit: number;
  page: number;
  user_id: string;
  sortBy?: string;
};

export const ListEpisodesSuggestionUseCase = async (
  params: ListEpisodesSuggestionUseCaseParams
) => {
  const { limit, page, user_id, sortBy } = params;

  const episodes = await ListEpisodesSuggestionImplementation({
    limit,
    page,
    user_id,
    sortBy,
  });

  const episodesCount = await CountEpisodesSuggestionImplementation({
    user_id,
  });

  return MakePagination({
    data: episodes,
    page,
    limit,
    totalCount: episodesCount,
  });
};
