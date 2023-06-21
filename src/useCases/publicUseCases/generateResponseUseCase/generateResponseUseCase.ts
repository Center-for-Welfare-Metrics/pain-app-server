import { getMainPromptImplementation } from "@implementations/mongoose/prompt";
import { SaveGeneratedAiResponseImplementation } from "@implementations/mongoose/public";
import {
  finalInstructions,
  getPromptWithAttributes,
} from "@utils/prompt/generate";
import { Configuration, OpenAIApi } from "openai";

type GenerateResponseUseCaseParams = {
  attributes: any;
};

const MODEL = "gpt-3.5-turbo-16k";

export const GenerateResponseUseCase = async ({
  attributes,
}: GenerateResponseUseCaseParams) => {
  const mainPrompt = await getMainPromptImplementation();

  const prompt = mainPrompt.prompt;

  const promptWithAttributes = getPromptWithAttributes(prompt, attributes);

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
        content: promptWithAttributes + finalInstructions,
      },
    ],
    max_tokens: 10000,
  });

  const text = response.data.choices[0].message.content;

  SaveGeneratedAiResponseImplementation({
    attributes,
    gptResponse: text,
    prompt_id: mainPrompt._id.toString(),
  });

  return text;
};
