import { Request, Response } from "express";
import { ListTracksUseCase } from "./listTrackUseCase";
import { query } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";
import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";

type ListTracksRequestQuery = {
  page: number;
  limit: number;
  episode_id: string;
};

export const ListTracksController = async (
  request: Request<any, any, any, ListTracksRequestQuery>,
  response: Response
) => {
  try {
    const { page, limit, episode_id } = request.query;

    const TracksListWithPagination = await ListTracksUseCase({
      episode_id,
      page,
      limit,
    });

    return response.status(200).json(TracksListWithPagination);
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

export const ListTracksValidator = () => [
  query("episode_id")
    .isMongoId()
    .custom(async (episode_id: string, { req }) => {
      const user_id = req["user"]._id;

      const episode = await GetEpisodeByIdImplementation({
        episode_id,
      });

      if (!episode) {
        throw new Error("Episode not found");
      }

      if (episode.creator_id.toString() !== user_id) {
        throw new Error("Episode not found");
      }
    }),
];
