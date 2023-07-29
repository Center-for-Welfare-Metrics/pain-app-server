import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";
import { GetTrackByIdImplementation } from "@implementations/mongoose/track";

export const TrackPermissionValidate = async (track_id, { req }) => {
  const user_id = req.user._id;

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
};
