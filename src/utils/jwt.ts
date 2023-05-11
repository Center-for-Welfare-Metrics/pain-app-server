import jwt from "jsonwebtoken";

export const generate = (content: string) =>
  jwt.sign(content, process.env.APP_SECRET);

export const verify = (token: string) =>
  jwt.verify(token, process.env.APP_SECRET);
