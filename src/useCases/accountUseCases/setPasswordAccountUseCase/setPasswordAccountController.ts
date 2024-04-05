import { Request, Response } from "express";
import { body } from "express-validator";
import { SetPasswordAccountUseCase } from "./setPasswordAccountUseCase";

type SetPasswordRequestBody = {
  password: string;
  password_confirm: string;
  secret_token: string;
};

export const SetPasswordAccountController = async (
  request: Request<any, any, SetPasswordRequestBody>,
  response: Response
) => {
  const { password, secret_token } = request.body;

  const user_id = request["user"]._id;

  try {
    await SetPasswordAccountUseCase({
      password,
      secret_token,
      user_id,
    });

    response.sendStatus(200);
  } catch (error) {
    response.sendStatus(500);
  }
};

export const SetPasswordAccountValidator = () => [
  body("password").isString().isLength({ min: 8 }),
  body("secret_token").isUUID(),
  body("password_confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
];
