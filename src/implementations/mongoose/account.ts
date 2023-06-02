import { UserModel } from "@models/user";
import { IRole } from "src/types";

type SetUserRoleParams = {
  user_id: string;
  role: IRole;
};

export const SetUserRole = async (params: SetUserRoleParams) => {
  const { user_id, role } = params;

  const user = await UserModel.findById(user_id);

  if (user) {
    user.role = role;
    await user.save();
  } else {
    throw new Error();
  }
};
