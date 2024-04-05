import { UpdateAccountPasswordImplementation } from "@implementations/mongoose/account";
import {
  DeleteSetPasswordCodeByUserImplementation,
  GetSetPasswordCodeByUserImplementation,
} from "@implementations/mongoose/set-password-code";
import { hashPassword } from "@utils/encryption";

type SetPasswordAccountUseCaseParams = {
  user_id: string;
  password: string;
  secret_token: string;
};

export const SetPasswordAccountUseCase = async (
  params: SetPasswordAccountUseCaseParams
) => {
  const { user_id, password, secret_token } = params;

  const setPasswordCode = await GetSetPasswordCodeByUserImplementation({
    user: user_id,
  });

  if (!setPasswordCode) {
    throw new Error("Code not found or expired");
  }

  if (!setPasswordCode.code_used) {
    throw new Error("Code not found or expired");
  }

  const secretToken = setPasswordCode.secret_token;

  if (secretToken !== secret_token) {
    throw new Error("Invalid secret token");
  }

  const passwordHashed = hashPassword(password);

  await UpdateAccountPasswordImplementation({
    user_id,
    password: passwordHashed,
  });

  await DeleteSetPasswordCodeByUserImplementation({
    user: user_id,
  });

  return;
};
