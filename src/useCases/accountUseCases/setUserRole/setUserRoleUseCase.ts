import { SetUserRole } from "@implementations/mongoose/account";
import { IRole } from "src/types";

type SetUserRoleParams = {
  user_id: string;
  role: IRole;
};

export const SetUserRoleUseCase = async (params: SetUserRoleParams) => {
  const { user_id, role } = params;

  await SetUserRole({ user_id, role });

  return true;
};
