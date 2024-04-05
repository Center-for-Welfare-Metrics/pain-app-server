import { SetPasswordCodeModel } from "@models/set-password-code";

type CreateSetPasswordCodeImplementationParams = {
  secret_token: string;
  user: string;
  code: string;
  expires_at: Date;
};

export const CreateSetPasswordCodeImplementation = async (
  params: CreateSetPasswordCodeImplementationParams
) => {
  const { secret_token, user, code, expires_at } = params;

  const newSetPasswordCode = await SetPasswordCodeModel.create({
    secret_token,
    user,
    code,
    expires_at,
  });
  return newSetPasswordCode;
};

type DeleteSetPasswordCodeImplementationParams = {
  id: string;
};

export const DeleteSetPasswordCodeImplementation = async (
  params: DeleteSetPasswordCodeImplementationParams
) => {
  const { id } = params;

  SetPasswordCodeModel.findByIdAndDelete(id);

  return;
};

type DeleteSetPasswordCodeByUserImplementationParams = {
  user: string;
};

export const DeleteSetPasswordCodeByUserImplementation = async (
  params: DeleteSetPasswordCodeByUserImplementationParams
) => {
  const { user } = params;

  await SetPasswordCodeModel.deleteMany({ user });
};

type GetSetPasswordCodeByUserImplementationParams = {
  user: string;
};

export const GetSetPasswordCodeByUserImplementation = async (
  params: GetSetPasswordCodeByUserImplementationParams
) => {
  const { user } = params;

  const SetPasswordCode = await SetPasswordCodeModel.findOne({ user });

  return SetPasswordCode;
};

type InvalidateCodeImplementationParams = {
  id: string;
};

export const InvalidateCodeImplementation = async (
  params: InvalidateCodeImplementationParams
) => {
  const { id } = params;

  await SetPasswordCodeModel.findOneAndUpdate(
    { _id: id },
    { code_used: true },
    { new: true }
  );

  return;
};
