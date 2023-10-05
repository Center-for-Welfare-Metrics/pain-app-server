import { RecoveryPasswordModel } from "@models/recovery-password";

type RecoveryPasswordCreateTokenParams = {
  email: string;
  user_id: string;
  token: string;
  expires_at: Date;
};

export const RecoveryPasswordCreateTokenImplementation = async (
  params: RecoveryPasswordCreateTokenParams
) => {
  const { email, user_id, token, expires_at } = params;

  await RecoveryPasswordModel.create({
    email,
    token,
    expires_at,
    user: user_id,
  });
};

type RecoveryPasswordGetTokenParams = {
  token: string;
};

export const RecoveryPasswordGetTokenImplementation = async (
  params: RecoveryPasswordGetTokenParams
) => {
  const { token } = params;

  const recoveryPassword = await RecoveryPasswordModel.findOne({ token });

  return recoveryPassword;
};

type GetRecoveryPasswordByEmailParams = {
  email: string;
};

export const GetRecoveryPasswordByEmailImplementation = async (
  params: GetRecoveryPasswordByEmailParams
) => {
  const { email } = params;

  const recoveryPassword = await RecoveryPasswordModel.findOne({ email });

  return recoveryPassword;
};

type RemoveRecoveryPasswordByEmailParams = {
  email: string;
};

export const RemoveRecoveryPasswordByEmailImplementation = async (
  params: RemoveRecoveryPasswordByEmailParams
) => {
  const { email } = params;

  await RecoveryPasswordModel.deleteMany({ email });
};
