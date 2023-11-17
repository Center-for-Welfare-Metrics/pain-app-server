import { getMainPromptImplementation } from "@implementations/mongoose/prompt";
import { SaveGeneratedAiResponseImplementation } from "@implementations/mongoose/public";
import {
  finalInstructions,
  getPromptWithAttributes,
} from "@utils/prompt/generate";
import { Response } from "express";
import OpenAi from "openai";

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

  const configuration = {
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_APIKEY,
  };

  const openai = new OpenAi(configuration);

  const GPT_MODEL_TO_USE = process.env.GPT_MODEL_TO_USE;

  try {
    const stream = await openai.chat.completions.create({
      model: GPT_MODEL_TO_USE,
      messages: [
        {
          role: "user",
          content: promptWithAttributes,
        },
        {
          role: "system",
          content: finalInstructions,
        },
      ],
      max_tokens: 4096,
      stream: true,
    });

    for await (const message of stream) {
      const content = message.choices[0]?.delta?.content || "";

      console.log(content);

      res.write(content);
    }

    res.end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
