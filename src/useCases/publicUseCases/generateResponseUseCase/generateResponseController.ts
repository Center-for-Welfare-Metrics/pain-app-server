import { Request, Response } from "express";
import { GenerateResponseUseCase } from "./generateResponseUseCase";
import { body } from "express-validator";
import { GetMainPromptAttributesImplementation } from "@implementations/mongoose/public";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

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
  // body("recaptchaToken")
  //   .isString()
  //   .custom(async (recaptchaToken) => {
  //     const client = new RecaptchaEnterpriseServiceClient();
  //     const projectPath = client.projectPath(process.env.GOOGLE_PROJECT_ID);
  //     const request = {
  //       assessment: {
  //         event: {
  //           token: recaptchaToken,
  //           siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  //         },
  //       },
  //       parent: projectPath,
  //     };
  //     const [response] = await client.createAssessment(request);
  //     if (!response.tokenProperties.valid) {
  //       throw new Error("Invalid recaptcha token");
  //     }
  //     if (response.riskAnalysis.score < 0.5) {
  //       throw new Error("Invalid recaptcha token");
  //     }
  //     return true;
  //   }),
  // body("attributes")
  //   .isObject()
  //   .custom(async (attributes) => {
  //     const mainPromptAttributes =
  //       await GetMainPromptAttributesImplementation();
  //     const attributesKeys = Object.keys(attributes);
  //     const mainPromptAttributesKeys = Object.keys(
  //       mainPromptAttributes.attributes
  //     );
  //     const attributesKeysAreValid = attributesKeys.every((key) =>
  //       mainPromptAttributesKeys.includes(key)
  //     );
  //     if (!attributesKeysAreValid) {
  //       throw new Error("Invalid attributes");
  //     }
  //     return true;
  //   }),
];
