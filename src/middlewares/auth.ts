import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "@utils/jwt";

export const useAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token not provided" });
  }

  try {
    const [, token] = authHeader.split(" ");
    const user = verifyJwt(token);
    const { email, name, _id } = user as any;

    request["user"] = {
      email,
      name,
      _id,
    };

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
};
