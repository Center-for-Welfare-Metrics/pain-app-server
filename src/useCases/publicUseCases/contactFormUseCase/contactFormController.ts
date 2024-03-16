import { Request, Response } from "express";
import { ContactFormUseCase } from "./contactFormUseCase";
import { body } from "express-validator";
import { recaptchaValidation } from "@utils/recaptcha/validation";
import { UAParser } from "ua-parser-js";

type ContactFormRequestBody = {
  email: string;
  subject: string;
  message: string;
};

export const ContactFormController = async (
  request: Request<{}, {}, ContactFormRequestBody>,
  response: Response
) => {
  try {
    const { message, subject, email } = request.body;

    const userAgent = request.headers["user-agent"];

    const parser = new UAParser(userAgent);

    const results = parser.getResult();

    const browser = results.browser.name;
    const browserVersion = results.browser.version;
    const os = results.os.name;

    const time = new Date().toLocaleString();

    ContactFormUseCase({
      email,
      subject,
      message,
      browser: `${browser} (${browserVersion})`,
      os,
      time,
    });

    return response.sendStatus(200);
  } catch (err) {
    return response.sendStatus(500);
  }
};

export const ContactFormValidator = () => [
  body("recaptchaToken").isString().custom(recaptchaValidation),
  body("email").isString().isEmail(),
  body("subject").isString(),
  body("message").isString(),
];
