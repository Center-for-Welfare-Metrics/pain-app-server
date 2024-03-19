import { UserModel } from "@models/user";
import { IRole } from "src/types";

type SetUserRoleParams = {
  user_id: string;
  role: IRole;
};

export const SetUserRoleImplementation = async (params: SetUserRoleParams) => {
  const { user_id, role } = params;

  const user = await UserModel.findById(user_id);

  if (user) {
    // user.role = role;
    // await user.save();
  } else {
    throw new Error();
  }
};

type UpdateAccountParams = {
  user_id: string;
  update: {
    name?: string;
  };
};

export const UpdateAccountImplementation = async (
  params: UpdateAccountParams
) => {
  const { user_id, update } = params;

  await UserModel.findByIdAndUpdate(user_id, update);
};

type UpdateAccountPasswordParams = {
  user_id: string;
  password: string;
};

export const UpdateAccountPasswordImplementation = async (
  params: UpdateAccountPasswordParams
) => {
  const { user_id, password } = params;

  await UserModel.findByIdAndUpdate(user_id, { password });
};

type UpdateAccountEmailImplementationParams = {
  user_id: string;
  email: string;
};

export const UpdateAccountEmailImplementation = async (
  params: UpdateAccountEmailImplementationParams
) => {
  const { user_id, email } = params;

  await UserModel.findByIdAndUpdate(user_id, { email });
};
