import jwt from "jsonwebtoken";

type JwtContent = {
  email: string;
  name: string;
};

export const generateJwt = (content: JwtContent) =>
  jwt.sign(content, process.env.APP_SECRET);

export const verifyJwt = (token: string) =>
  jwt.verify(token, process.env.APP_SECRET);

export const decodeJwt = (token: string) => jwt.decode(token, { json: true });
