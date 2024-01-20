import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { NOT_FOUND_ERROR } from "src/constants/validation";

export const Return404OnNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    const error = errorsArray[0];
    if (error.msg === NOT_FOUND_ERROR) {
      return res.sendStatus(404);
    }
  }
  next();
};
