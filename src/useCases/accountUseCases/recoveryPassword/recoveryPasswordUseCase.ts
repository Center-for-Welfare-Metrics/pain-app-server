import { GetUserByEmailImplementation } from "@implementations/mongoose/auth";
import {
  GetRecoveryPasswordByEmailImplementation,
  RecoveryPasswordCreateTokenImplementation,
  RemoveRecoveryPasswordByEmailImplementation,
} from "@implementations/mongoose/recovery-password";
import { sendRecoveryPasswordEmail } from "@utils/email/sendRecoveryPassword";
import { checkIfTimeIsLessThan90Seconds, days } from "@utils/helpers/time";
import { v4 as uuidv4 } from "uuid";

const userHaveToWaitToSendEmail = async (email: string) => {
  const recoveryPasswordRecord = await GetRecoveryPasswordByEmailImplementation(
    {
      email,
    }
  );

  if (!recoveryPasswordRecord) {
    return false;
  }

  const createdAt = new Date(recoveryPasswordRecord?.createdAt);

  const isLessThan90Seconds = checkIfTimeIsLessThan90Seconds(createdAt);

  return isLessThan90Seconds;
};

type RecoveryPasswordUseCaseParams = {
  email: string;
  browser_name: string;
  operating_system: string;
};

export const RecoveryPasswordUseCase = async (
  params: RecoveryPasswordUseCaseParams
) => {
  const { email, browser_name, operating_system } = params;

  const userHaveToWait = await userHaveToWaitToSendEmail(email);

  if (userHaveToWait) {
    throw new Error("Wait 90 seconds to try again");
  }

  const token = uuidv4();

  const expires_at = new Date(Date.now() + days(1));

  const user = await GetUserByEmailImplementation(email);

  if (!user) {
    throw new Error("User not found");
  }

  RemoveRecoveryPasswordByEmailImplementation({ email });

  const recoveryRecord = await RecoveryPasswordCreateTokenImplementation({
    expires_at,
    token,
    email,
    user_id: user._id.toString(),
  });

  const name = user.name;

  sendRecoveryPasswordEmail(email, {
    name,
    browser_name,
    operating_system,
    action_url: `${process.env.RECOVERY_PASSWORD_URL}/${token}`,
    support_url: `${process.env.SUPPORT_URL}`,
  });

  return recoveryRecord;
};
