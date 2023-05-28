import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const mappedErrors = errors.mapped();

  const obj = Object.keys(mappedErrors).reduce((acc, key) => {
    acc[key] = mappedErrors[key].msg;
    return acc;
  }, {});

  return res.status(422).json({
    errors: obj,
  });
};
