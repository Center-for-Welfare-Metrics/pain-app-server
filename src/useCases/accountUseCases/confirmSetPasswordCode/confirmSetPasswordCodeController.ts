import { Request, Response } from "express";
import { ConfirmSetPasswordCodeUseCase } from "./confirmSetPasswordCodeUseCase";
import { body } from "express-validator";

type ConfirmSetPasswordCodeRequestBody = {
  code: string;
};

export const ConfirmSetPasswordCodeController = async (
  request: Request<any, any, ConfirmSetPasswordCodeRequestBody>,
  response: Response
) => {
  const { code } = request.body;
  const user_id = request["user"]._id;

  try {
    const secret_token = await ConfirmSetPasswordCodeUseCase({ code, user_id });
    response.status(200).send(secret_token);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

export const ConfirmSetPasswordCodeValidator = () => [
  body("code").isString().isLength({ min: 6, max: 6 }),
];
