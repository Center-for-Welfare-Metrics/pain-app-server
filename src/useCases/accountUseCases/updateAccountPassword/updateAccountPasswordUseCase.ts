import { UpdateAccountPasswordImplementation } from "@implementations/mongoose/account";
import { GetUserByIdImplementation } from "@implementations/mongoose/auth";
import { checkPassword, hashPassword } from "@utils/encryption";

type UpdateAccountPasswordUseCaseParams = {
  user_id: string;
  current_password: string;
  new_password: string;
};

export const UpdateAccountPasswordUseCase = async (
  params: UpdateAccountPasswordUseCaseParams
) => {
  const { user_id, current_password, new_password } = params;

  const user = await GetUserByIdImplementation(user_id);

  const isPasswordCorrect = checkPassword(current_password, user.password);

  if (!isPasswordCorrect) {
    throw new Error();
  }

  const passwordHashed = hashPassword(new_password);

  await UpdateAccountPasswordImplementation({
    user_id,
    password: passwordHashed,
  });

  return true;
};
