import { Request, Response } from "express";
import { ListEpisodesSuggestionUseCase } from "./listEpisodesSuggestionUseCase";

type ListEpisodesSuggestionRequestQuery = {
  page: number;
  limit: number;
  sortBy?: string;
};

export const ListEpisodesSuggestionController = async (
  request: Request<any, any, any, ListEpisodesSuggestionRequestQuery>,
  response: Response
) => {
  try {
    const { page, limit, sortBy } = request.query;

    const user_id = request["user"]._id;

    const patientsSugestionWithPagination = await ListEpisodesSuggestionUseCase(
      {
        page,
        limit,
        user_id,
        sortBy,
      }
    );

    return response.status(200).json(patientsSugestionWithPagination);
  } catch (err) {
    console.log(err);
    return response.sendStatus(500);
  }
};
