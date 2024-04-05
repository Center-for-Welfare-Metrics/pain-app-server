import { GetUserByIdImplementation } from "@implementations/mongoose/auth";
import {
  CreateSetPasswordCodeImplementation,
  DeleteSetPasswordCodeByUserImplementation,
} from "@implementations/mongoose/set-password-code";
import { sendSetPasswordEmail } from "@utils/email/sendSetPasswordEmail";
import { generateTextNumberCode } from "@utils/helpers/string";
import { v4 } from "uuid";

type RequestSetAccountPasswordUseCaseParams = {
  user_id: string;
  browser_name: string;
  operating_system: string;
};

export const RequestSetAccountPasswordUseCase = async (
  params: RequestSetAccountPasswordUseCaseParams
) => {
  const { user_id, browser_name, operating_system } = params;

  const user = await GetUserByIdImplementation(user_id);

  if (!user) {
    throw new Error("User not found");
  }

  const secret_token = v4();

  const code = generateTextNumberCode(6);

  const expires_at = new Date();
  expires_at.setHours(expires_at.getHours() + 1);

  await DeleteSetPasswordCodeByUserImplementation({ user: user_id });

  await CreateSetPasswordCodeImplementation({
    code,
    secret_token,
    expires_at,
    user: user_id,
  });

  const email = user.email;

  const name = user.name;

  sendSetPasswordEmail(email, {
    name,
    browser_name,
    code,
    operating_system,
  });

  return;
};
