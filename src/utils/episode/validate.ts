import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";

export const EpisodePermissionValidate = async (episode_id, { req }) => {
  const user_id = req.user._id;

  const episode = await GetEpisodeByIdImplementation({
    episode_id: episode_id,
  });

  if (!episode) {
    throw new Error("Episode not found");
  }

  if (episode.creator_id.toString() !== user_id) {
    throw new Error("Episode not found");
  }
};

export const GuestEpisodePermissionValidate = async (episode_id) => {
  const episode = await GetEpisodeByIdImplementation({
    episode_id: episode_id,
  });

  if (!episode) {
    throw new Error("Episode not found");
  }

  if (!!episode.creator_id?.toString()) {
    throw new Error("Episode not found");
  }
};
