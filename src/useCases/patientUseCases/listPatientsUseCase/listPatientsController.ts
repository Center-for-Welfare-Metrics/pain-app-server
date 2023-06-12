import { Request, Response } from "express";
import { ListPatientsUseCase } from "./listPatientsUseCase";

type ListPatientsRequestQuery = {
  page: number;
  limit: number;
  sortBy?: string;
};

export const ListPatientsController = async (
  request: Request<any, any, any, ListPatientsRequestQuery>,
  response: Response
) => {
  try {
    const { page, limit, sortBy } = request.query;

    const user_id = request["user"]._id;

    const patientsListWithPagination = await ListPatientsUseCase({
      user_id,
      page,
      limit,
      sortBy,
    });

    return response.status(200).json(patientsListWithPagination);
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};
