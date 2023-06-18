import { getMainPromptCreatorImplementation } from "@implementations/mongoose/prompt";
import { IUser } from "@models/user";

export const getMainPromptCreatorUseCase = async () => {
  const user = await getMainPromptCreatorImplementation();

  return user;
};
