import { Request, Response } from "express";
import { body, param } from "express-validator";
import { UpdateDiscussionTextUseCase } from "./updateDiscussionTextUseCase";

type UpdateDiscussionTextRequestParams = {
  discussion_id: string;
};

type UpdateDiscussionTextRequestBody = {
  text: any;
};

export const UpdateDiscussionTextController = async (
  request: Request<
    UpdateDiscussionTextRequestParams,
    any,
    UpdateDiscussionTextRequestBody
  >,
  response: Response
) => {
  try {
    const { discussion_id } = request.params;

    const { text } = request.body;

    const updatedDiscussion = await UpdateDiscussionTextUseCase({
      discussion_id,
      text,
    });

    return response.status(200).json(updatedDiscussion);
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

export const UpdateDiscussionTextValidator = () => [
  param("discussion_id").isMongoId(),
  body("text").isObject().notEmpty(),
];
