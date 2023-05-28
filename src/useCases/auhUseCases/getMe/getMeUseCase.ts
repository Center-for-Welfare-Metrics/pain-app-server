import { GetMe } from "src/implementations/mongoose/auth";

export const GetMeUseCase = async (email: string) => {
  const me = GetMe(email);

  return me;
};
