import { GetUserByEmailImplementation } from "@implementations/mongoose/auth";

export const GetMeUseCase = async (email: string) => {
  const me = GetUserByEmailImplementation(email);

  return me;
};
