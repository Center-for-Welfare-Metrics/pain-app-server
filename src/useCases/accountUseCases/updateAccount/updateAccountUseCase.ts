import { UpdateAccountImplementation } from "@implementations/mongoose/account";
import { GetUserByIdImplementation } from "@implementations/mongoose/auth";

type UpdateAccountUseCaseParams = {
  user_id: string;
  update: {
    name?: string;
  };
};

export const UpdateAccountUseCase = async ({
  user_id,
  update,
}: UpdateAccountUseCaseParams) => {
  await UpdateAccountImplementation({
    user_id,
    update,
  });

  const user_updated = await GetUserByIdImplementation(user_id);

  return user_updated;
};
