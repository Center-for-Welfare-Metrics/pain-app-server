import { Request, Response } from "express";
import { GenerateResponseUseCase } from "./generateResponseUseCase";
import { body } from "express-validator";
import { GetMainPromptAttributesImplementation } from "@implementations/mongoose/public";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import { recaptchaValidation } from "@utils/recaptcha/validation";

type GenerateResponseRequestBody = {
  attributes: any;
};

export const GenerateResponseController = async (
  req: Request<{}, {}, GenerateResponseRequestBody>,
  res: Response
) => {
  try {
    const { attributes } = req.body;
    return GenerateResponseUseCase({
      attributes,
      res,
    });
    // return res.status(200).json(generatedResponse);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const GenerateResponseValidator = () => [
  body("recaptchaToken").isString().custom(recaptchaValidation),
  body("attributes")
    .isObject()
    .custom(async (attributes) => {
      const mainPromptAttributes =
        await GetMainPromptAttributesImplementation();
      const attributesKeys = Object.keys(attributes);
      const mainPromptAttributesKeys = Object.keys(
        mainPromptAttributes.attributes
      );
      const attributesKeysAreValid = attributesKeys.every((key) =>
        mainPromptAttributesKeys.includes(key)
      );
      if (!attributesKeysAreValid) {
        throw new Error("Invalid attributes");
      }
      return true;
    }),
];
