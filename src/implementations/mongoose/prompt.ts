import { PromptModel } from "@models/prompt";

type SavePromptParams = {
  user_id: string;
  prompt: string;
  attributes?: any;
};

export const SavePrompt = async (params: SavePromptParams) => {
  const { user_id, prompt, attributes } = params;
  console.log(user_id);
  await PromptModel.findOneAndUpdate(
    { user: user_id },
    { prompt, attributes, user: user_id },
    { upsert: true, new: true }
  );

  return true;
};

type GetPromptParams = {
  user_id: string;
};

export const GetPrompt = async (params: GetPromptParams) => {
  const { user_id } = params;

  const prompt = await PromptModel.findOne({ user: user_id });

  return prompt;
};
