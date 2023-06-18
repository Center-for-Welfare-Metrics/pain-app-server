import {
  setMainPromptImplementation,
  unsetMainPromptImplementation,
} from "@implementations/mongoose/prompt";

type SetMainPromptUseCaseParams = {
  prompt_id: string;
};

export const SetMainPromptUseCase = async (
  params: SetMainPromptUseCaseParams
) => {
  const { prompt_id } = params;

  await unsetMainPromptImplementation();

  await setMainPromptImplementation({ prompt_id });

  return true;
};
