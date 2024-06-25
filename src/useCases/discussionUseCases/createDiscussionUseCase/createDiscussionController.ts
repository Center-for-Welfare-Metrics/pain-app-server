import { Request, Response } from "express";
import { CreateDiscussionUseCase } from "./createDiscussionUseCase";
import { body } from "express-validator";

type CreateDiscussionRequestBody = {
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  parent_id: string | null;
  text: string;
  title?: string;
};

export const CreateDiscussionController = async (
  request: Request<any, any, CreateDiscussionRequestBody>,
  response: Response
) => {
  const {
    patient_id,
    episode_id,
    parent_id,
    text,
    title,
    track_id,
    segment_id,
  } = request.body;

  try {
    const user_id = request["user"]._id;

    const discussion = await CreateDiscussionUseCase({
      patient_id,
      episode_id,
      track_id,
      segment_id,
      user_id,
      text,
      title,
      parent_id,
    });

    return response.status(201).json(discussion);
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const CreateDiscussionValidator = () => [
  body("patient_id").isMongoId(),
  body("episode_id")
    .optional({
      values: "null",
    })
    .isMongoId(),
  body("parent_id")
    .optional({
      values: "null",
    })
    .isMongoId(),
  body("text").isString().notEmpty(),
  body("title").optional().isString(),
];
