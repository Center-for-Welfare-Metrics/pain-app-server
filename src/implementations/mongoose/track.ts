import { ITrackPainType, TrackModel } from "@models/track";

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

type UpdateTrackParams = {
  track_id: string;
  update: {
    name?: string;
    comment?: string;
    pain_type?: ITrackPainType;
  };
};

export const UpdateTrackImplementation = async (params: UpdateTrackParams) => {
  const { track_id, update } = params;

  const track_updated = await TrackModel.findByIdAndUpdate(track_id, update, {
    new: true,
  });

  return track_updated;
};

type GetTrackById = {
  track_id: string;
};

export const GetTrackByIdImplementation = async (params: GetTrackById) => {
  const { track_id } = params;

  const track = await TrackModel.findById(track_id);

  return track;
};
