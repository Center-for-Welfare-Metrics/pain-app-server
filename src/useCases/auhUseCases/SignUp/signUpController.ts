import { Request, Response } from "express";
import { SignUpUseCase } from "./signUpUseCase";
import { body } from "express-validator";
import { VerifyIfEmailExistsImplementation } from "@implementations/mongoose/auth";
import { AssigneUnsavedEpisodeUseCase } from "@useCases/episodeUseCases/assigneUnsavedEpisodeUseCase/assigneUnsavedEpisodeUseCase";

type SignUpBody = {
  email: string;
  name: string;
  password: string;
  episode_id?: string;
};

export const SignUpController = async (
  request: Request<any, any, SignUpBody>,
  response: Response
) => {
  const { email, name, password, episode_id } = request.body;

  try {
    const user = await SignUpUseCase({
      email,
      name,
      password,
    });

    if (episode_id) {
      await AssigneUnsavedEpisodeUseCase({
        episode_id,
        user_id: user.user._id.toString(),
      });
    }

    response.status(201).json(user);
  } catch (error) {
    return response.sendStatus(500);
  }
};

export const SignUpValidator = () => [
  body("email")
    .isEmail()
    .custom(async (email) => {
      const user = await VerifyIfEmailExistsImplementation(email);
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("name").isString(),
  body("password").isString(),
  body("episode_id").isMongoId().optional(),
  body("terms").isBoolean(),
];
