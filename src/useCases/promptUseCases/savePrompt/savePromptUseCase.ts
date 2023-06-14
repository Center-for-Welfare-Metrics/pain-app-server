import {
  CountPromptsImplementation,
  SavePromptImplementation,
} from "@implementations/mongoose/prompt";

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
  const promptsCount = await CountPromptsImplementation({ user_id });

  const title = `Prompt ${promptsCount + 1}`;

  const promptCreated = await SavePromptImplementation({
    title,
    prompt,
    user_id,
    attributes,
  });

  return promptCreated;
};
