import { Request, Response } from "express";
import { SignUpUseCase } from "./signUpUseCase";
import { body } from "express-validator";
import { VerifyIfEmailExists } from "@implementations/mongoose/auth";

type SignUpBody = {
  email: string;
  name: string;
  password: string;
};

export const SignUpController = async (
  request: Request<any, SignUpBody>,
  response: Response
) => {
  const { email, name, password } = request.body;

  try {
    const user = await SignUpUseCase({
      email,
      name,
      password,
    });

    response.status(201).json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const SignUpValidator = () => [
  body("email")
    .isEmail()
    .custom(async (email) => {
      const user = await VerifyIfEmailExists(email);
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("name").isString(),
  body("password").isString(),
  body("terms").isBoolean(),
];
