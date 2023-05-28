import { Request, Response } from "express";
import { decodeJwt, verifyJwt } from "@utils/jwt";

export const useAuth = (request: Request, response: Response) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const user = verifyJwt(token);
    console.log(user);
    const { email, name } = user as any;

    request.user = {
      email,
      name,
    };

    return response.status(200).json(user);
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
};
