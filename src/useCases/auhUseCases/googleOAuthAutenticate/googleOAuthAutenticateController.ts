import { Request, Response } from "express";
import { googleOAuthAutenticateUseCase } from "./googleOAuthAutenticateUseCase";
import { AssigneUnsavedEpisodeUseCase } from "@useCases/episodeUseCases/assigneUnsavedEpisodeUseCase/assigneUnsavedEpisodeUseCase";
import { body } from "express-validator";

type OAuthAutenticateRequestBody = {
  code: string;
  episode_id?: string;
};

export const googleOAuthAutenticateController = async (
  request: Request<any, any, OAuthAutenticateRequestBody>,
  response: Response
) => {
  const { code, episode_id } = request.body;

  try {
    const user = await googleOAuthAutenticateUseCase(code);

    if (episode_id) {
      await AssigneUnsavedEpisodeUseCase({
        episode_id,
        user_id: user.user._id.toString(),
      });
    }

    return response.status(200).json(user);
  } catch (err) {
    return response.status(400).json({
      message: err.message || "Unexpected error.",
    });
  }
};

export const googleOAuthAutenticateValidator = () => [body("code").isString()];
