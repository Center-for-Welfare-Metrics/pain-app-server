import { PromptModel } from "@models/prompt";

type SavePromptParams = {
  title: string;
  user_id: string;
  prompt: string;
  attributes?: any;
};

export const SavePromptImplementation = async (params: SavePromptParams) => {
  const { user_id, title, prompt, attributes } = params;

  await PromptModel.create({
    title,
    user: user_id,
    prompt,
    attributes,
  });

  return true;
};

type GetPromptParams = {
  prompt_id: string;
};

export const GetPromptByIdImplementation = async (params: GetPromptParams) => {
  const { prompt_id } = params;

  const prompt = await PromptModel.findById(prompt_id);

  return prompt;
};

type ListPromptsParams = {
  user_id: string;
};

export const ListPromptsImplementation = async (params: ListPromptsParams) => {
  const { user_id } = params;

  const prompts = await PromptModel.find({ user: user_id });

  return prompts;
};

type UpdatePromptParams = {
  prompt_id: string;
  user_id: string;
  update: {
    title?: string;
    prompt?: string;
    attributes?: any;
  };
};

export const UpdatePromptImplementation = async (
  params: UpdatePromptParams
) => {
  const { prompt_id, user_id, update } = params;

  const prompt = await PromptModel.findOneAndUpdate(
    { _id: prompt_id, user: user_id },
    update
  );

  if (!prompt) {
    throw new Error();
  }
};
