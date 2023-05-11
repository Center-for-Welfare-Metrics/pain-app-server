import winston from "winston";

export const handleError = (err, req, res, next) => {
  winston.error(err);
  res.status(500).send(err.message);
};
