import { DeletePromptImplementation } from "@implementations/mongoose/prompt";

type DeletePromptUseCaseParams = {
  prompt_id: string;
};

export const DeletePromptUseCase = async (
  params: DeletePromptUseCaseParams
) => {
  const { prompt_id } = params;

  await DeletePromptImplementation({ prompt_id });
};
