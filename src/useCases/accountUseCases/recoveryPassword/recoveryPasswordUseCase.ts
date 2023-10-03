import {
  GetUserByEmailImplementation,
  GetUserByIdImplementation,
} from "@implementations/mongoose/auth";
import { RecoveryPasswordCreateTokenImplementation } from "@implementations/mongoose/recovery-password";
import { sendRecoveryPasswordEmail } from "@utils/email/sender";
import { v4 as uuidv4 } from "uuid";

type RecoveryPasswordUseCaseParams = {
  email: string;
  browser_name: string;
  operating_system: string;
};

export const RecoveryPasswordUseCase = async (
  params: RecoveryPasswordUseCaseParams
) => {
  const { email, browser_name, operating_system } = params;

  const token = uuidv4();

  const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const user = await GetUserByEmailImplementation(email);

  if (!user) {
    throw new Error("User not found");
  }

  const user_id = user._id.toString();

  const recoveryRecord = await RecoveryPasswordCreateTokenImplementation({
    expires_at,
    token,
    user_id,
  });

  const name = user.name;

  sendRecoveryPasswordEmail(email, {
    name,
    browser_name,
    operating_system,
    action_url: `${process.env.RECOVERY_PASSWORD_URL}/recovery-password/${token}`,
    support_url: `${process.env.RECOVERY_PASSWORD_URL}/support`,
  });

  return recoveryRecord;
};
