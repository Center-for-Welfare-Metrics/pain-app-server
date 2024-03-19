import { GetUserByIdImplementation } from "@implementations/mongoose/auth";

export const GetMeUseCase = async (user_id: string) => {
  const me = GetUserByIdImplementation(user_id);

  return me;
};
