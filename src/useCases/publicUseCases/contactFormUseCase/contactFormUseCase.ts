import { sendContactEmail } from "@utils/email/sender";

type ContactFormUseCaseParams = {
  email: string;
  subject: string;
  message: string;
  browser: string;
  os: string;
  time: string;
};

export const ContactFormUseCase = async (params: ContactFormUseCaseParams) => {
  const { email, subject, message, browser, os, time } = params;
  sendContactEmail({ email, subject, message, browser, os, time });
  return true;
};
