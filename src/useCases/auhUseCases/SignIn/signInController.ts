import { Request, Response } from "express";
import { SignInUseCase } from "./signInUseCase";
import { body } from "express-validator";
import { AssigneUnsavedEpisodeUseCase } from "@useCases/episodeUseCases/assigneUnsavedEpisodeUseCase/assigneUnsavedEpisodeUseCase";

type SignInBody = {
  email: string;
  password: string;
  episode_id?: string;
};

export const SignInController = async (
  request: Request<any, any, SignInBody>,
  response: Response
) => {
  const { email, password, episode_id } = request.body;

  try {
    const user = await SignInUseCase({
      email,
      password,
    });

    if (episode_id) {
      await AssigneUnsavedEpisodeUseCase({
        episode_id,
        user_id: user.user._id.toString(),
      });
    }

    response.status(200).json(user);
  } catch (error) {
    return error.message === "User not found"
      ? response.sendStatus(401)
      : response.sendStatus(500);
  }
};

export const SignInValidator = () => [
  body("email").isEmail(),
  body("password").isString(),
  body("episode_id").isMongoId().optional(),
];
