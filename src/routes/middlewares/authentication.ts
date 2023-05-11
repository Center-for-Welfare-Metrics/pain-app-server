import { verify } from "@utils/jwt";

export const verifyToken = () => {
  return async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const decoded = verify(token.split(" ")[1]);
        req.user = decoded;
        await next();
      } catch (err) {
        res.status(401).send({ error: "invalid token" });
      }
    } else {
      res.status(400).send({ error: "token required" });
    }
  };
};
