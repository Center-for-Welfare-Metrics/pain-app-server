import { GetPromptByIdImplementation } from "@implementations/mongoose/prompt";

type SavePromptUseCaseParams = {
  user_id: string;
  prompt_id: string;
};

export const GetPromptUseCase = async ({
  user_id,
  prompt_id,
}: SavePromptUseCaseParams) => {
  const myPrompt = await GetPromptByIdImplementation({
    prompt_id,
  });

  if (myPrompt.user.toString() !== user_id) throw new Error("Not found");

  return myPrompt;
};
