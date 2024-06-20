import { Request, Response } from "express";
import { ListDiscussionUseCase } from "./listDiscussionUseCase";
import { query } from "express-validator";

type ListDiscussionRequestQuery = {
  page: number;
  limit: number;
  episode_id: string | null;
  patient_id: string | null;
  parent_id: string | null;
  sortBy?: string;
};

export const ListDiscussionController = async (
  request: Request<any, any, any, ListDiscussionRequestQuery>,
  response: Response
) => {
  try {
    const { page, limit, sortBy, patient_id, episode_id, parent_id } =
      request.query;

    const discussionWithPagination = await ListDiscussionUseCase({
      patient_id,
      episode_id,
      parent_id,
      page,
      limit,
      sortBy,
    });

    return response.status(200).json(discussionWithPagination);
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

export const ListDiscussionValidator = () => [
  query("patient_id").optional({ values: "null" }).isMongoId(),
  query("episode_id").optional({ values: "null" }).isMongoId(),
];
