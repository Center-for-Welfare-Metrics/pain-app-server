import { Configuration, OpenAIApi } from "openai";

type GenerateCompletionUseCaseParams = {
  prompt: string;
};

const MODEL = "gpt-3.5-turbo-16k";

export const GenerateCompletionUseCase = async ({
  prompt,
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
        content: prompt,
      },
    ],
  });

  const text = response.data.choices[0].message.content;

  return {
    response: text,
    prompt_tokens: response.data?.usage?.prompt_tokens,
    response_tokens: response.data?.usage?.completion_tokens,
    total: response.data?.usage?.total_tokens,
  };
};
