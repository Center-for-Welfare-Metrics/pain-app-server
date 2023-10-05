import { Request, Response } from "express";
import { body } from "express-validator";
import { ResetPasswordUseCase } from "./resetPasswordUseCase";

type ResetPasswordRequestBody = {
  password: string;
  password_confirm: string;
  token: string;
};

export const ResetPasswordController = async (
  request: Request<any, any, ResetPasswordRequestBody>,
  response: Response
) => {
  const { password, token } = request.body;

  try {
    await ResetPasswordUseCase({
      password,
      token,
    });

    response.sendStatus(200);
  } catch (error) {
    response.sendStatus(500);
  }
};

export const ResetPasswordValidator = () => [
  body("password").isString().isLength({ min: 8 }),
  body("password_confirm").isString().isLength({ min: 8 }),
  body("token").isUUID(),
  body("password_confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
];
