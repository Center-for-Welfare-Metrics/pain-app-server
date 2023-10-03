import { RecoveryPasswordModel } from "@models/recovery-password";

type RecoveryPasswordCreateTokenParams = {
  user_id: string;
  token: string;
  expires_at: Date;
};

export const RecoveryPasswordCreateTokenImplementation = async (
  params: RecoveryPasswordCreateTokenParams
) => {
  const { user_id, token, expires_at } = params;

  await RecoveryPasswordModel.create({ user_id, token, expires_at });
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
