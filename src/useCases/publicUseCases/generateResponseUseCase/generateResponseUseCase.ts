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

  const GPT_MODEL_TO_USE = process.env.GPT_MODEL_TO_USE;

  try {
    const response = await openai.createChatCompletion(
      {
        model: GPT_MODEL_TO_USE,
        messages: [
          {
            role: "user",
            content: promptWithAttributes + finalInstructions,
          },
        ],
        stream: true,
      },
      { responseType: "stream" }
    );
    // @ts-ignore
    return response.data.pipe(res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
