import { AiGeneretedModel } from "@models/ai-generated";
import { PromptModel, PromptOptions } from "@models/prompt";

export const GetMainPromptAttributesImplementation = async () => {
  const prompt = await PromptModel.findOne({ isMain: true });

  return prompt.attributes;
};

type SaveGEneratedAiResponseIMplementation = {
  attributes: any;
  gptResponse: string;
  prompt_id: string;
};

export const SaveGeneratedAiResponseImplementation = async (
  params: SaveGEneratedAiResponseIMplementation
) => {
  const { attributes, gptResponse, prompt_id } = params;

  await AiGeneretedModel.create({
    attributes,
    gptResponse,
    prompt_id,
  });

  return true;
};
