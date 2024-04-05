import {
  DeleteSetPasswordCodeByUserImplementation,
  GetSetPasswordCodeByUserImplementation,
  InvalidateSetPasswordCodeImplementation,
} from "@implementations/mongoose/set-password-code";

type ConfirmSetPasswordCodeUseCaseParams = {
  code: string;
  user_id: string;
};

export const ConfirmSetPasswordCodeUseCase = async (
  params: ConfirmSetPasswordCodeUseCaseParams
) => {
  const { code: promptedCode, user_id } = params;

  const setPasswordCode = await GetSetPasswordCodeByUserImplementation({
    user: user_id,
  });

  if (!setPasswordCode) {
    throw new Error("Code not found or expired");
  }

  if (setPasswordCode.code_used) {
    throw new Error("Code not found or expired");
  }

  const expires_at = new Date(setPasswordCode.expires_at);

  const now = new Date();

  if (now > expires_at) {
    await DeleteSetPasswordCodeByUserImplementation({
      user: user_id,
    });
    throw new Error("Code not found or expired");
  }

  const code = setPasswordCode.code;

  if (code !== promptedCode) {
    throw new Error("Invalid code");
  }

  const secret_token = setPasswordCode.secret_token;

  await InvalidateSetPasswordCodeImplementation({
    id: setPasswordCode._id.toString(),
  });

  return secret_token;
};
