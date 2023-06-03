import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "@utils/jwt";
import { GetUserByIdImplementation } from "@implementations/mongoose/auth";

export const useSuper = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user_id = request["user"]._id;

    const user = await GetUserByIdImplementation(user_id);

    if (!user) {
      throw new Error();
    }

    const isSuper = user.super;

    if (!isSuper) {
      throw new Error();
    }

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
};
