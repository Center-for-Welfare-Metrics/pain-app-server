import { Request, Response } from "express";
import { AddEpisodeToBookMarkUseCase } from "./addToBookMarkUseCase";

type AddToBookMarkRequestBody = {
  episode_id: string;
};

export const AddEpisodeToBookMarkController = async (
  req: Request<any, any, AddToBookMarkRequestBody>,
  res: Response
) => {
  const { episode_id } = req.body;

  const user_id = req["user"]?._id;

  try {
    const episodeAdded = await AddEpisodeToBookMarkUseCase({
      user_id,
      episode_id,
    });

    return res.status(201).json(episodeAdded);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
