import { UpdateAccountPasswordImplementation } from "@implementations/mongoose/account";
import {
  RecoveryPasswordGetTokenImplementation,
  RemoveRecoveryPasswordByEmailImplementation,
} from "@implementations/mongoose/recovery-password";
import { hashPassword } from "@utils/encryption";

const checkIfHasExpired = (expires_at: Date) => {
  const now = new Date();
  return now > expires_at;
};

type ResetPasswordUseCaseParams = {
  token: string;
  password: string;
};

export const ResetPasswordUseCase = async ({
  token,
  password,
}: ResetPasswordUseCaseParams) => {
  const recoveryPasswordResetRecord =
    await RecoveryPasswordGetTokenImplementation({
      token,
    });

  if (!recoveryPasswordResetRecord) {
    throw new Error("Invalid token");
  }

  const expires_at = recoveryPasswordResetRecord.expires_at;

  const hasExpired = checkIfHasExpired(expires_at);

  if (hasExpired) {
    throw new Error("Token has expired");
  }

  const user_id = recoveryPasswordResetRecord.user.toString();

  const passwordHashed = hashPassword(password);

  await UpdateAccountPasswordImplementation({
    user_id,
    password: passwordHashed,
  });

  await RemoveRecoveryPasswordByEmailImplementation({
    email: recoveryPasswordResetRecord.email,
  });

  return true;
};
