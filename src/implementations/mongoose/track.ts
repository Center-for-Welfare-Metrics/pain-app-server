import { TrackModel } from "@models/track";

type CreateTrackParams = {
  name: string;
  episode_id: string;
};

export const CreateTrackImplementation = async (params: CreateTrackParams) => {
  const { name, episode_id } = params;

  const track_created = await TrackModel.create({
    name: name,
    episode_id: episode_id,
    pain_type: "physical",
  });

  return track_created;
};

type GetTrackListParams = {
  episode_id: string;
  page: number;
  limit: number;
};

export const ListTracksImplementation = async (params: GetTrackListParams) => {
  const { episode_id, page, limit } = params;

  const tracks = await TrackModel.find({ episode_id })
    .limit(limit)
    .skip(page * limit)
    .sort({ createdAt: 1 });

  return tracks;
};

type CountTracksParams = {
  episode_id: string;
};

export const CountTracksImplementation = async (params: CountTracksParams) => {
  const { episode_id } = params;

  const count = await TrackModel.countDocuments({ episode_id });

  return count;
};
