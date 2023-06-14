import { SavePromptImplementation } from "@implementations/mongoose/prompt";

type SavePromptUseCaseParams = {
  title: string;
  prompt: string;
  user_id: string;
  attributes?: any;
};

export const SavePromptUseCase = async ({
  title,
  prompt,
  user_id,
  attributes,
}: SavePromptUseCaseParams) => {
  await SavePromptImplementation({
    title,
    prompt,
    user_id,
    attributes,
  });

  return true;
};
