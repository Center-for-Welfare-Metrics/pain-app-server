import { PromptOptions } from "@models/prompt";
import { finalInstructions } from "@utils/prompt/generate";
import { Configuration, OpenAIApi } from "openai";

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
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_APIKEY,
  });
  const openai = new OpenAIApi(configuration);

  const GPT_MODEL_TO_USE = process.env.GPT_MODEL_TO_USE;

  const response = await openai.createChatCompletion({
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
  });

  const text = response.data.choices[0].message.content;

  return {
    response: text,
    prompt_tokens: response.data?.usage?.prompt_tokens,
    response_tokens: response.data?.usage?.completion_tokens,
    total: response.data?.usage?.total_tokens,
  };
};
