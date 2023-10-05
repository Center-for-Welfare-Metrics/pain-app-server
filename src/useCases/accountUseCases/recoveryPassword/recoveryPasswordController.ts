import { Request, Response } from "express";
import { RecoveryPasswordUseCase } from "./recoveryPasswordUseCase";
import UAParser from "ua-parser-js";
import { body } from "express-validator";

type SetUserRoleRequestBody = {
  email: string;
};

export const RecoveryPasswordController = async (
  request: Request<any, any, SetUserRoleRequestBody>,
  response: Response
) => {
  try {
    const { email } = request.body;

    const userAgent = request.headers["user-agent"];

    const parser = new UAParser(userAgent);

    const results = parser.getResult();

    await RecoveryPasswordUseCase({
      email,
      browser_name: results.browser.name,
      operating_system: results.os.name,
    });

    return response.sendStatus(200);
  } catch (err) {
    console.log(err);
    return response.status(422).json({
      message: err.message,
    });
  }
};

export const RecoveryPasswordValidator = () => [body("email").isEmail()];
