import { Request, Response } from "express";
import { RequestEmailChangeUseCase } from "./requestEmailChangeUseCase";
import UAParser from "ua-parser-js";
import { body } from "express-validator";

type RequestEmailChangeRequestBody = {
  newEmail: string;
};

export const RequestEmailChangeController = async (
  request: Request<any, any, RequestEmailChangeRequestBody>,
  response: Response
) => {
  try {
    const { newEmail } = request.body;

    const user_id = request["user"]._id;

    const userAgent = request.headers["user-agent"];

    const parser = new UAParser(userAgent);

    const results = parser.getResult();

    await RequestEmailChangeUseCase({
      user_id,
      newEmail,
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

export const RequestEmailChangeValidator = () => [body("newEmail").isEmail()];
