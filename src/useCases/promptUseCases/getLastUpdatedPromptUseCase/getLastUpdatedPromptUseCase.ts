import { GetLastUpdatedPromptImplementation } from "@implementations/mongoose/prompt";

type GetLastUpdatePromptUseCaseParams = {
  user_id: string;
};

export const GetLastUpdatedPromptUseCase = async (
  params: GetLastUpdatePromptUseCaseParams
) => {
  const { user_id } = params;

  const prompt = await GetLastUpdatedPromptImplementation({ user_id });

  if (!prompt) {
    throw new Error();
  }

  return prompt;
};
