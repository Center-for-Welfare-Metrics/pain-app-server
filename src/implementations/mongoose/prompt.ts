import { PromptModel, PromptOptions } from "@models/prompt";

type SavePromptParams = {
  title: string;
  user_id: string;
  prompt: string;
  options: PromptOptions;
  attributes?: any;
};

export const SavePromptImplementation = async (params: SavePromptParams) => {
  const { user_id, title, prompt, attributes, options } = params;

  const promptCreated = await PromptModel.create({
    title,
    user: user_id,
    prompt,
    options,
    attributes,
  });

  return promptCreated;
};

type GetPromptParams = {
  prompt_id: string;
};

export const GetPromptByIdImplementation = async (params: GetPromptParams) => {
  const { prompt_id } = params;

  const prompt = await PromptModel.findById(prompt_id);

  return prompt;
};

type CountPromptsParams = {
  user_id: string;
};

export const CountPromptsImplementation = async (
  params: CountPromptsParams
) => {
  const { user_id } = params;

  const count = await PromptModel.countDocuments({ user: user_id });

  return count;
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
    options?: PromptOptions;
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

type DeletePromptParams = {
  prompt_id: string;
};

export const DeletePromptImplementation = async (
  params: DeletePromptParams
) => {
  const { prompt_id } = params;

  await PromptModel.findByIdAndDelete(prompt_id);

  return true;
};

type PromptExistsParams = {
  prompt_id: string;
  user_id: string;
};

export const PromptExistsImplementation = async (
  params: PromptExistsParams
) => {
  const { prompt_id, user_id } = params;

  const prompt = await PromptModel.findOne({ _id: prompt_id, user: user_id });

  if (!prompt) {
    return false;
  }

  return true;
};

type GetLastUpdatePromptParams = {
  user_id: string;
};

export const GetLastUpdatedPromptImplementation = async (
  params: GetLastUpdatePromptParams
) => {
  const { user_id } = params;

  const prompt = await PromptModel.findOne({ user: user_id }).sort({
    updatedAt: -1,
  });

  return prompt;
};

type SetMainPromptParams = {
  prompt_id: string;
};

export const setMainPromptImplementation = async (
  params: SetMainPromptParams
) => {
  const { prompt_id } = params;

  const prompt = await PromptModel.findOneAndUpdate(
    { _id: prompt_id },
    { isMain: true }
  );

  if (!prompt) {
    throw new Error();
  }
};

export const unsetMainPromptImplementation = async () => {
  await PromptModel.findOneAndUpdate({ isMain: true }, { isMain: false });

  return true;
};

export const getMainPromptCreatorImplementation = async () => {
  const prompt = await PromptModel.findOne({ isMain: true }).populate({
    path: "user",
    select: "name -_id",
  });

  return prompt.user as any as { name: string };
};
