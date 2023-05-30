import { SavePrompt } from "@implementations/mongoose/prompt";
import { Configuration, OpenAIApi } from "openai";

type SavePromptUseCaseParams = {
  prompt: string;
  user_id: string;
  attributes?: any;
};

export const SavePromptUseCase = async ({
  prompt,
  user_id,
  attributes,
}: SavePromptUseCaseParams) => {
  await SavePrompt({
    prompt,
    user_id,
    attributes,
  });

  return true;
};
