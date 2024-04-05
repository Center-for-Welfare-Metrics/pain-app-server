import {
  GetUserByEmailImplementation,
  GetUserByIdImplementation,
} from "@implementations/mongoose/auth";
import {
  CreateUpdateEmailCodeImplementation,
  DeleteUpdateEmailCodeByUserImplementation,
} from "@implementations/mongoose/update-email-code";
import { sendRequestEmailUpdate } from "@utils/email/sendRequestEmailUpdate";
import { generateTextNumberCode } from "@utils/helpers/string";

type RequestEmailChangeUseCaseParams = {
  user_id: string;
  newEmail: string;
  browser_name: string;
  operating_system: string;
};

export const RequestEmailChangeUseCase = async (
  params: RequestEmailChangeUseCaseParams
) => {
  const { user_id, newEmail, browser_name, operating_system } = params;

  const user = await GetUserByIdImplementation(user_id);

  if (!user) {
    throw new Error("User not found");
  }

  const findNewEmail = await GetUserByEmailImplementation(newEmail);

  if (!!findNewEmail) {
    throw new Error("Email already in use");
  }

  const code = generateTextNumberCode(6);

  const expires_at = new Date();
  expires_at.setHours(expires_at.getHours() + 1);

  await DeleteUpdateEmailCodeByUserImplementation({
    user: user_id,
  });

  await CreateUpdateEmailCodeImplementation({
    newEmail,
    user: user_id,
    code,
    expires_at,
  });

  const email = user.email;

  sendRequestEmailUpdate(email, {
    code,
    browser_name,
    operating_system,
  });

  return;
};
