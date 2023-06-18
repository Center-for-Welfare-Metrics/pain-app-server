import { Request, Response } from "express";
import { SignInUseCase } from "./signInUseCase";
import { body } from "express-validator";

type SignInBody = {
  email: string;
  password: string;
};

export const SignInController = async (
  request: Request<any, any, SignInBody>,
  response: Response
) => {
  const { email, password } = request.body;

  try {
    const user = await SignInUseCase({
      email,
      password,
    });

    response.status(200).json(user);
  } catch (error) {
    return response.sendStatus(500);
  }
};

export const SignInValidator = () => [
  body("email").isEmail(),
  body("password").isString(),
];
