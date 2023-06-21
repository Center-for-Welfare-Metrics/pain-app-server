import { GetMainPromptAttributesImplementation } from "@implementations/mongoose/public";

export const GetMainPromptAttributesUseCase = async () => {
  const mainPromptAttributes = await GetMainPromptAttributesImplementation();

  return mainPromptAttributes;
};
