import { Request, Response } from "express";
import { RequestSetAccountPasswordUseCase } from "./requestSetAccountPasswordUseCase";
import UAParser from "ua-parser-js";

export const RequestSetAccountPasswordController = async (
  request: Request,
  response: Response
) => {
  try {
    const user_id = request["user"]._id;

    const userAgent = request.headers["user-agent"];

    const parser = new UAParser(userAgent);

    const results = parser.getResult();

    await RequestSetAccountPasswordUseCase({
      user_id,
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
