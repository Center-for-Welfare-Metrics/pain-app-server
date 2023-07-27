import {
  CountTracksImplementation,
  ListTracksImplementation,
} from "@implementations/mongoose/track";
import { MakePagination } from "@utils/pagination";

type ListTracksUseCaseParams = {
  episode_id: string;
  limit: number;
  page: number;
};

export const ListTracksUseCase = async (params: ListTracksUseCaseParams) => {
  const { episode_id, limit, page } = params;

  const tracks = await ListTracksImplementation({
    episode_id,
    limit,
    page,
  });

  const tracksCount = await CountTracksImplementation({ episode_id });

  return MakePagination({
    data: tracks,
    page,
    limit,
    totalCount: tracksCount,
  });
};
