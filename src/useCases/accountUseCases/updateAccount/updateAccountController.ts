import { Request, Response } from "express";
import { UpdateAccountUseCase } from "./updateAccountUseCase";
import { CleanUpUndefined } from "@utils/controller-utils";
import { body } from "express-validator";

type UpdateAccountRequestBody = {
  name?: string;
};

export const UpdateAccountController = async (
  request: Request<any, any, UpdateAccountRequestBody>,
  response: Response
) => {
  try {
    const { name } = request.body;

    const user_id = request["user"]._id;

    const user_updated = await UpdateAccountUseCase({
      update: CleanUpUndefined<UpdateAccountRequestBody>({ name }),
      user_id,
    });

    return response.status(200).json(user_updated);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const UpdateAccountValidator = () => [
  body("name").optional().isString(),
];
