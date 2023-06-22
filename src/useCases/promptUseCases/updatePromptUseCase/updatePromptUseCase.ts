import { UpdatePromptImplementation } from "@implementations/mongoose/prompt";
import { IAttributesConfig, PromptOptions } from "@models/prompt";

type UpdaetPromptUseCaseParams = {
  prompt_id: string;
  user_id: string;
  update: {
    title?: string;
    prompt?: string;
    attributes?: any;
    options?: PromptOptions;
    attributesConfig?: IAttributesConfig;
  };
};

export const UpdatePromptUseCase = async (
  params: UpdaetPromptUseCaseParams
) => {
  const { prompt_id, user_id, update } = params;
  await UpdatePromptImplementation({
    user_id,
    prompt_id,
    update,
  });

  return true;
};
