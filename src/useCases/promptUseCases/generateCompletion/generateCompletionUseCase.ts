import { PromptOptions } from "@models/prompt";
import { finalInstructions } from "@utils/prompt/generate";
import OpenAI from "openai";

type GenerateCompletionUseCaseParams = {
  prompt: string;
  options: PromptOptions;
};

const getOptionValue = (value) => {
  return value ?? undefined;
};

export const GenerateCompletionUseCase = async ({
  prompt,
  options,
}: GenerateCompletionUseCaseParams) => {
  const configuration = {
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_APIKEY,
  };

  const openai = new OpenAI(configuration);

  const GPT_MODEL_TO_USE = process.env.GPT_MODEL_TO_USE;

  const response = await openai.chat.completions.create({
    model: GPT_MODEL_TO_USE,
    messages: [
      {
        role: "user",
        content: prompt + finalInstructions,
      },
    ],
    frequency_penalty: getOptionValue(options.frequency_penalty),
    presence_penalty: getOptionValue(options.presence_penalty),
    temperature:
      options.temperature === 1
        ? undefined
        : getOptionValue(options.temperature),
    top_p: options.top_p === 1 ? undefined : getOptionValue(options.top_p),
    max_tokens: 4000,
  });

  const text = response.choices[0].message.content;

  return {
    response: text,
    prompt_tokens: response?.usage?.prompt_tokens,
    response_tokens: response?.usage?.completion_tokens,
    total: response?.usage?.total_tokens,
  };
};
