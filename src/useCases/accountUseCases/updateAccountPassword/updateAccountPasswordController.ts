import { Request, Response } from "express";
import { UpdateAccountPasswordUseCase } from "./updateAccountPasswordUseCase";
import { body } from "express-validator";
import { WrongPasswordError } from "./errors";

type UpdateAccountPasswordBody = {
  current_password: string;
  new_password: string;
};

export const UpdateAccountPasswordController = async (
  request: Request<any, any, UpdateAccountPasswordBody>,
  response: Response
) => {
  try {
    const { current_password, new_password } = request.body;

    const user_id = request["user"]._id;

    await UpdateAccountPasswordUseCase({
      current_password,
      new_password,
      user_id,
    });

    return response.sendStatus(204);
  } catch (err) {
    if (err instanceof WrongPasswordError) {
      return response.status(401).json({ message: "Wrong password" });
    }
    return response.sendStatus(500);
  }
};

export const UpdateAccountPasswordValidator = () => [
  body("current_password").isString(),
  body("new_password").isString(),
  body("confirm_password")
    .isString()
    .custom((value, { req }) => {
      if (value !== req.body.new_password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
];
