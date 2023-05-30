import { Request, Response, NextFunction } from "express";
import { decodeJwt, verifyJwt } from "@utils/jwt";

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
    const { email, name } = user as any;

    request["user"] = {
      email,
      name,
    };

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
};
