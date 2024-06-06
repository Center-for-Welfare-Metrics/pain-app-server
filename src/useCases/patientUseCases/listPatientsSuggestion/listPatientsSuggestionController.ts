import { Request, Response } from "express";
import { ListPatientsSuggestionUseCase } from "./listPatientsSuggestionUseCase";

type ListPatientsSuggestionRequestQuery = {
  page: number;
  limit: number;
  sortBy?: string;
};

export const ListPatientsSuggestionController = async (
  request: Request<any, any, any, ListPatientsSuggestionRequestQuery>,
  response: Response
) => {
  try {
    const { page, limit, sortBy } = request.query;

    const user_id = request["user"]._id;

    const patientsSugestionWithPagination = await ListPatientsSuggestionUseCase(
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
