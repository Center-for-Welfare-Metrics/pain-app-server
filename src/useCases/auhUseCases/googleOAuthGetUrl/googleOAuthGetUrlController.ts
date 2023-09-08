import { Request, Response } from "express";
import { googleOAuthGetUrlUseCase } from "./googleOAuthGetUrlUseCase";

export const googleOAuthGetUrlController = async (
  _: Request,
  response: Response
) => {
  try {
    const url = await googleOAuthGetUrlUseCase();
    return response.status(200).json({ url });
  } catch (err) {
    return response.status(400).json({
      message: err.message || "Unexpected error.",
    });
  }
};
