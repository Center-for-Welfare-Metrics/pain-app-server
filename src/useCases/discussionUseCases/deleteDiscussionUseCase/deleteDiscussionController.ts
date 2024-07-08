import { Request, Response } from "express";
import { body, param } from "express-validator";
import { DeleteDiscussionUseCase } from "./deleteDiscussionUseCase";

type DeleteDiscussionRequestParams = {
  discussion_id: string;
};

export const DeleteDiscussionController = async (
  request: Request<DeleteDiscussionRequestParams>,
  response: Response
) => {
  try {
    const { discussion_id } = request.params;

    const deletedDiscussion = await DeleteDiscussionUseCase({
      discussion_id,
    });

    return response.status(200).json(deletedDiscussion);
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

export const DeleteDiscussionValidator = () => [
  param("discussion_id").isMongoId(),
];
