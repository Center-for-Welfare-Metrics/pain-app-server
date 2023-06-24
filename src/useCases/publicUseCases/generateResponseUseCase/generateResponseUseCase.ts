import { getMainPromptImplementation } from "@implementations/mongoose/prompt";
import { SaveGeneratedAiResponseImplementation } from "@implementations/mongoose/public";
import {
  finalInstructions,
  getPromptWithAttributes,
} from "@utils/prompt/generate";
import { Response } from "express";
import { Configuration, OpenAIApi } from "openai";

type GenerateResponseUseCaseParams = {
  attributes: any;
  res: Response;
};

const MODEL = "gpt-3.5-turbo-16k";

export const GenerateResponseUseCase = async ({
  attributes,
  res,
}: GenerateResponseUseCaseParams) => {
  const mainPrompt = await getMainPromptImplementation();

  const prompt = mainPrompt.prompt;

  const promptWithAttributes = getPromptWithAttributes(prompt, attributes);

  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_APIKEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion(
    {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: promptWithAttributes + finalInstructions,
        },
      ],
      max_tokens: 10000,
      stream: true,
    },
    { responseType: "stream" }
  );

  // @ts-ignore
  return response.data.pipe(res);
};
