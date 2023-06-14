import { ListPromptsImplementation } from "@implementations/mongoose/prompt";

type ListPromptsUseCaseParams = {
  user_id: string;
};

export const ListPromptsUseCase = async (params: ListPromptsUseCaseParams) => {
  const { user_id } = params;

  const prompts = await ListPromptsImplementation({
    user_id,
  });

  return prompts;
};
