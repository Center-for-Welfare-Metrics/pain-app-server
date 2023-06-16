import {
  CountPromptsImplementation,
  SavePromptImplementation,
} from "@implementations/mongoose/prompt";
import { PromptOptions } from "@models/prompt";

type SavePromptUseCaseParams = {
  prompt: string;
  user_id: string;
  options: PromptOptions;
  attributes?: any;
};

export const SavePromptUseCase = async ({
  prompt,
  user_id,
  options,
  attributes,
}: SavePromptUseCaseParams) => {
  const promptsCount = await CountPromptsImplementation({ user_id });

  const title = `Prompt ${promptsCount + 1}`;

  const promptCreated = await SavePromptImplementation({
    title,
    prompt,
    user_id,
    options,
    attributes,
  });

  return promptCreated;
};
