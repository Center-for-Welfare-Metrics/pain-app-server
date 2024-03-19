import { UpdateEmailCodeModel } from "@models/update-email-code";

type CreateUpdateEmailCodeImplementationParams = {
  newEmail: string;
  user: string;
  code: string;
  expires_at: Date;
};

export const CreateUpdateEmailCodeImplementation = async (
  params: CreateUpdateEmailCodeImplementationParams
) => {
  const { newEmail, user, code, expires_at } = params;

  const newUpdateEmailCode = await UpdateEmailCodeModel.create({
    newEmail,
    user,
    code,
    expires_at,
  });
  return newUpdateEmailCode;
};

type DeleteUpdateEmailCodeImplementationParams = {
  id: string;
};

export const DeleteUpdateEmailCodeImplementation = async (
  params: DeleteUpdateEmailCodeImplementationParams
) => {
  const { id } = params;

  UpdateEmailCodeModel.findByIdAndDelete(id);

  return;
};

type DeleteUpdateEmailCodeByUserImplementationParams = {
  user: string;
};

export const DeleteUpdateEmailCodeByUserImplementation = async (
  params: DeleteUpdateEmailCodeByUserImplementationParams
) => {
  const { user } = params;

  await UpdateEmailCodeModel.deleteMany({ user });
};

type GetUpdateEmailCodeByUserImplementationParams = {
  user: string;
};

export const GetUpdateEmailCodeByUserImplementation = async (
  params: GetUpdateEmailCodeByUserImplementationParams
) => {
  const { user } = params;

  const updateEmailCode = await UpdateEmailCodeModel.findOne({ user });

  return updateEmailCode;
};
