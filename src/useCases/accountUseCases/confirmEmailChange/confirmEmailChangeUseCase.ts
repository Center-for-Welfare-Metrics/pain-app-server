import { UpdateAccountEmailImplementation } from "@implementations/mongoose/account";
import {
  DeleteUpdateEmailCodeByUserImplementation,
  GetUpdateEmailCodeByUserImplementation,
} from "@implementations/mongoose/update-email-code";

type ConfirmEmailChangeUseCaseParams = {
  code: string;
  user_id: string;
};

export const ConfirmEmailChangeUseCase = async (
  params: ConfirmEmailChangeUseCaseParams
) => {
  const { code: promptedCode, user_id } = params;

  const updateEmailCode = await GetUpdateEmailCodeByUserImplementation({
    user: user_id,
  });

  if (!updateEmailCode) {
    throw new Error("Code not found or expired");
  }

  const expires_at = new Date(updateEmailCode.expires_at);

  const now = new Date();

  if (now > expires_at) {
    await DeleteUpdateEmailCodeByUserImplementation({
      user: user_id,
    });
    throw new Error("Code not found or expired");
  }

  const code = updateEmailCode.code;

  if (code !== promptedCode) {
    throw new Error("Invalid code");
  }

  const newEmail = updateEmailCode.newEmail;

  await UpdateAccountEmailImplementation({
    user_id,
    email: newEmail,
  });

  return true;
};
