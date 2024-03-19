import { Request, Response } from "express";
import { ConfirmEmailChangeUseCase } from "./confirmEmailChangeUseCase";
import { body } from "express-validator";

type ConfirmEmailChangeRequestBody = {
  code: string;
};

export const ConfirmEmailChangeController = async (
  request: Request<any, any, ConfirmEmailChangeRequestBody>,
  response: Response
) => {
  const { code } = request.body;
  const user_id = request["user"]._id;

  try {
    await ConfirmEmailChangeUseCase({ code, user_id });
    response.sendStatus(200);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

export const ConfirmEmailChangeValidator = () => [
  body("code").isString().isLength({ min: 6, max: 6 }),
];
