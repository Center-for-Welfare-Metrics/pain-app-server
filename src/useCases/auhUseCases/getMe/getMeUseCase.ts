import { GetUserByEmail } from "@implementations/mongoose/auth";

export const GetMeUseCase = async (email: string) => {
  const me = GetUserByEmail(email);

  return me;
};
