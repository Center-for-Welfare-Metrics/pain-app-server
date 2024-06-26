import { Request, Response } from "express";
import { ListTracksUseCase } from "./listTrackUseCase";
import { query } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";
import { GetEpisodeByIdImplementation } from "@implementations/mongoose/episodes";
import { EpisodePermissionValidate } from "@utils/episode/validate";

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
  query("episode_id").isMongoId().custom(EpisodePermissionValidate),
];
