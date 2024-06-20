import { Request, Response } from "express";
import { CreateDiscussionUseCase } from "./createDiscussionUseCase";
import { body } from "express-validator";
import { GetPatientByIdImplementation } from "@implementations/mongoose/patient";

type CreateDiscussionRequestBody = {
  patient_id: string | undefined;
  episode_id: string | undefined;
  parent_id: string | null;
  text: string;
  title?: string;
};

export const CreateDiscussionController = async (
  request: Request<any, any, CreateDiscussionRequestBody>,
  response: Response
) => {
  const { patient_id, episode_id, parent_id, text, title } = request.body;

  try {
    const user_id = request["user"]._id;

    const discussion = await CreateDiscussionUseCase({
      user_id,
      text,
      title,
      patient_id,
      episode_id,
      parent_id,
    });

    return response.status(201).json(discussion);
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
};

export const CreateDiscussionValidator = () => [
  body("patient_id").optional().isMongoId(),
  body("episode_id").optional().isMongoId(),
  body("parent_id")
    .optional({
      values: "null",
    })
    .isMongoId(),
  body("text").isString().notEmpty(),
  body("title").optional().isString(),
];
