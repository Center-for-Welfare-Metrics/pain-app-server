import { GetPrompt } from "@implementations/mongoose/prompt";

type SavePromptUseCaseParams = {
  user_id: string;
};

export const GetPromptUseCase = async ({
  user_id,
}: SavePromptUseCaseParams) => {
  const myPrompt = await GetPrompt({
    user_id,
  });

  return myPrompt;
};
