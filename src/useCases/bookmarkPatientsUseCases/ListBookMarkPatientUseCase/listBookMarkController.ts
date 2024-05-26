import { Request, Response } from "express";
import { ListBookmarkPatientsUseCase } from "./listBookMarkUseCase";

type ListBookmarkPatientsRequestQuery = {
  page: number;
  limit: number;
  sortBy?: string;
};

export const ListBookmarkPatientsController = async (
  request: Request<any, any, any, ListBookmarkPatientsRequestQuery>,
  response: Response
) => {
  try {
    const { page, limit, sortBy } = request.query;

    const user_id = request["user"]._id;

    const bookmarkPatientsListWithPagination =
      await ListBookmarkPatientsUseCase({
        user_id,
        page,
        limit,
        sortBy,
      });

    return response.status(200).json(bookmarkPatientsListWithPagination);
  } catch (err) {
    return response.sendStatus(500);
  }
};
