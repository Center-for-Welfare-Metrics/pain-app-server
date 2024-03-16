import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

export const recaptchaValidation = async (recaptchaToken) => {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(process.env.GOOGLE_PROJECT_ID);
  const request = {
    assessment: {
      event: {
        token: recaptchaToken,
        siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
      },
    },
    parent: projectPath,
  };
  const [response] = await client.createAssessment(request);
  if (!response.tokenProperties.valid) {
    throw new Error("Invalid recaptcha token");
  }
  if (response.riskAnalysis.score < 0.5) {
    throw new Error("Invalid recaptcha token");
  }
  return true;
};
