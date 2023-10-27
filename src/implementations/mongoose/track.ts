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
    .sort({ createdAt: 1 })
    .populate("segments");

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

type DeleteTrackParams = {
  track_id: string;
};

export const DeleteTrackImplementation = async (params: DeleteTrackParams) => {
  const { track_id } = params;

  const track_deleted = await TrackModel.findByIdAndDelete(track_id);

  return track_deleted;
};

type DeleteTrackByEpisodeIdParams = {
  episode_id: string;
};

export const DeleteTrackByEpisodeIdImplementation = async (
  params: DeleteTrackByEpisodeIdParams
) => {
  const { episode_id } = params;

  const track_deleted = await TrackModel.deleteMany({ episode_id });

  return track_deleted;
};

type CreateManyTracksParams = {
  episode_id: string;
  tracks: string[];
};

export const CreateManyTracksImplementation = async (
  params: CreateManyTracksParams
) => {
  const { episode_id, tracks } = params;

  const tracks_created = await TrackModel.insertMany(
    tracks.map((track) => ({
      name: track,
      episode_id,
      pain_type: "physical",
    }))
  );

  return tracks_created;
};
