import { Request, Response } from "express";
import { RemoveEpisodeFromBookMarkUseCase } from "./removeEpisodeFromBookMarkUseCase";

type AddEpisodeToBookMarkRequestBody = {
  episode_id: string;
};

export const RemoveEpisodeFromBookMarkController = async (
  req: Request<any, any, AddEpisodeToBookMarkRequestBody>,
  res: Response
) => {
  const { episode_id } = req.body;

  const user_id = req["user"]?._id;

  try {
    await RemoveEpisodeFromBookMarkUseCase({
      user_id,
      episode_id,
    });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
