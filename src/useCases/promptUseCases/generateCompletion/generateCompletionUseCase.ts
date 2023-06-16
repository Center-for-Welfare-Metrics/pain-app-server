import { PromptOptions } from "@models/prompt";
import { Configuration, OpenAIApi } from "openai";

type GenerateCompletionUseCaseParams = {
  prompt: string;
  options: PromptOptions;
};

const MODEL = "gpt-3.5-turbo-16k";

export const GenerateCompletionUseCase = async ({
  prompt,
  options,
}: GenerateCompletionUseCaseParams) => {
  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_APIKEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log(options);
  const response = await openai.createChatCompletion({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    frequency_penalty: options.frequency_penalty,
    presence_penalty: options.presence_penalty,
    temperature: options.temperature === 1 ? undefined : options.temperature,
    top_p: options.top_p === 1 ? undefined : options.top_p,
  });

  const text = response.data.choices[0].message.content;

  return {
    response: text,
    prompt_tokens: response.data?.usage?.prompt_tokens,
    response_tokens: response.data?.usage?.completion_tokens,
    total: response.data?.usage?.total_tokens,
  };
};
