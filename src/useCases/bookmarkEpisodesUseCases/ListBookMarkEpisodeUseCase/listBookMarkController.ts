import { Request, Response } from "express";
import { ListBookmarkEpisodesUseCase } from "./listBookMarkUseCase";

type ListBookmarkPatientsRequestQuery = {
  page: number;
  limit: number;
  sortBy?: string;
};

export const ListBookmarkEpisodesController = async (
  request: Request<any, any, any, ListBookmarkPatientsRequestQuery>,
  response: Response
) => {
  try {
    const { page, limit, sortBy } = request.query;

    const user_id = request["user"]._id;

    const bookmarkEpisodesListWithPagination =
      await ListBookmarkEpisodesUseCase({
        user_id,
        page,
        limit,
        sortBy,
      });

    return response.status(200).json(bookmarkEpisodesListWithPagination);
  } catch (err) {
    return response.sendStatus(500);
  }
};
