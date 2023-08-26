import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";
import { GetTrackByIdImplementation } from "@implementations/mongoose/track";

export const TrackPermissionValidate = async (track_id, { req }) => {
  const user_id = req.user._id;

  await TrackPermissionValidation(track_id, user_id);
};

export const TrackPermissionValidation = async (track_id, user_id) => {
  return new Promise(async (resolve, reject) => {
    const track = await GetTrackByIdImplementation({ track_id });

    if (!track) {
      throw new Error("Track not found");
    }

    const episode = await GetEpisodeByIdImplementation({
      episode_id: track.episode_id.toString(),
    });

    if (!episode) {
      throw new Error("Episode not found");
    }

    if (episode.creator_id.toString() !== user_id) {
      throw new Error("Episode not found");
    }

    resolve(true);
  });
};

export const TrackGuestPermissionValidate = async (track_id) => {
  await TrackGuestPermissionValidateAsync(track_id);
};

export const TrackGuestPermissionValidateAsync = async (track_id) => {
  return new Promise(async (resolve, reject) => {
    const track = await GetTrackByIdImplementation({ track_id });

    if (!track) {
      throw new Error("Track not found");
    }

    const episode = await GetEpisodeByIdImplementation({
      episode_id: track.episode_id.toString(),
    });

    if (!episode) {
      throw new Error("Episode not found");
    }

    if (!!episode.creator_id?.toString()) {
      throw new Error("Episode not found");
    }

    resolve(true);
  });
};
