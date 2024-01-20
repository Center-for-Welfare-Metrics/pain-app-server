import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";
import { NOT_FOUND_ERROR, NO_PERMISSION_ERROR } from "src/constants/validation";

export const EpisodePermissionValidate = async (episode_id, { req }) => {
  const user_id = req.user._id;

  const episode = await GetEpisodeByIdImplementation({
    episode_id: episode_id,
  });

  if (!episode) {
    throw new Error(NOT_FOUND_ERROR);
  }

  if (episode.creator_id.toString() !== user_id) {
    throw new Error(NO_PERMISSION_ERROR);
  }
};

export const GuestEpisodePermissionValidate = async (episode_id) => {
  const episode = await GetEpisodeByIdImplementation({
    episode_id: episode_id,
  });

  if (!episode) {
    throw new Error(NOT_FOUND_ERROR);
  }

  if (!!episode.creator_id?.toString()) {
    throw new Error(NO_PERMISSION_ERROR);
  }
};
