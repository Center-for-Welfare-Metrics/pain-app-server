import { EpisodesBookmarkModel } from "@models/episodes-bookmark";
import { getSortObject } from "@utils/sortBy";

type ListBookmarkEpisodesParams = {
  user_id: string;
  limit: number;
  page: number;
  sortBy?: string;
};

export const ListBookmarkEpisodesImplementation = async (
  params: ListBookmarkEpisodesParams
) => {
  const { user_id, limit, page, sortBy } = params;

  const sortObject = getSortObject(sortBy);

  const episodes = await EpisodesBookmarkModel.find({ user_id })
    .sort(sortObject)
    .limit(limit)
    .skip(page * limit)
    .populate([
      {
        path: "episode",
        populate: [
          {
            path: "tracks_count",
          },
          { path: "patient" },
        ],
      },
    ]);

  return episodes;
};

type CountBookmarkEpisodesParams = {
  user_id: string;
};

export const CountBookmarkEpisodesImplementation = async (
  params: CountBookmarkEpisodesParams
) => {
  const { user_id } = params;
  const count = await EpisodesBookmarkModel.countDocuments({
    user_id,
  });

  return count;
};

type DeleteBookmarkRecordByPatientIdParams = {
  episode_id: string;
};

export const DeleteBookmarkRecordsByEpisodeIdImplementation = async (
  params: DeleteBookmarkRecordByPatientIdParams
) => {
  const { episode_id } = params;
  await EpisodesBookmarkModel.deleteMany({
    episode_id,
  });

  return;
};
