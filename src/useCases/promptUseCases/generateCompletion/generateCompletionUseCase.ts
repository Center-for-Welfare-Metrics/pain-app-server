import { PromptOptions } from "@models/prompt";
import { Configuration, OpenAIApi } from "openai";

type GenerateCompletionUseCaseParams = {
  prompt: string;
  options: PromptOptions;
};

const MODEL = "gpt-3.5-turbo-16k";

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

  const response = await openai.createChatCompletion({
    model: MODEL,
    messages: [
      {
        role: "user",
        content:
          prompt + `\nfinal instructions: use markdown to format the text`,
      },
    ],
    frequency_penalty: getOptionValue(options.frequency_penalty),
    presence_penalty: getOptionValue(options.presence_penalty),
    temperature:
      options.temperature === 1
        ? undefined
        : getOptionValue(options.temperature),
    top_p: options.top_p === 1 ? undefined : getOptionValue(options.top_p),
    max_tokens: 10000,
  });

  const text = response.data.choices[0].message.content;

  return {
    response: text,
    prompt_tokens: response.data?.usage?.prompt_tokens,
    response_tokens: response.data?.usage?.completion_tokens,
    total: response.data?.usage?.total_tokens,
  };
};
