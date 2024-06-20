import { Request, Response } from "express";
import { GetDiscussionByIDUseCase } from "./getDiscussionByIdUseCase";
import { param } from "express-validator";

type RequestParams = {
  discussion_id: string;
};

export const GetDiscussionByIdController = async (
  req: Request<RequestParams>,
  res: Response
) => {
  const { discussion_id } = req.params;

  try {
    const discussion = await GetDiscussionByIDUseCase({
      discussion_id,
    });

    return res.status(200).json(discussion);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const GetDiscussionByIdValidator = () => [
  param("discussion_id").isMongoId(),
];
