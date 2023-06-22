import {
  CountPromptsImplementation,
  SavePromptImplementation,
} from "@implementations/mongoose/prompt";
import { IAttributesConfig, PromptOptions } from "@models/prompt";

type SavePromptUseCaseParams = {
  prompt: string;
  user_id: string;
  options: PromptOptions;
  attributes?: any;
  attributesConfig?: IAttributesConfig;
};

export const SavePromptUseCase = async ({
  prompt,
  user_id,
  options,
  attributes,
  attributesConfig,
}: SavePromptUseCaseParams) => {
  const promptsCount = await CountPromptsImplementation({ user_id });

  const title = `Prompt ${promptsCount + 1}`;

  const promptCreated = await SavePromptImplementation({
    title,
    prompt,
    user_id,
    options,
    attributes,
    attributesConfig,
  });

  return promptCreated;
};
