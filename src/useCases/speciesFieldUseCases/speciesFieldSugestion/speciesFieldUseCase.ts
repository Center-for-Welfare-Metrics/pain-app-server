import OpenAI from "openai";

type SugestionSpeciesFieldUseCase = {
  animal: string;
};

export const SugestionSpeciesFieldUseCase = async (
  params: SugestionSpeciesFieldUseCase
) => {
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
        role: "system",
        content: "Do you know the scientific names of all animals.",
      },
      {
        role: "user",
        content: `scientific name for ${params.animal}`,
      },
    ],
    functions: [
      {
        name: "get_scientific_name",
        description: "Get scientific name in a given specie name",
        parameters: {
          type: "object",
          properties: {
            scientific_name: {
              type: "string",
              name: "the scientific name, e.g. Canis lupus familiaris",
            },
          },
          required: ["scientific_name"],
        },
      },
    ],
    function_call: { name: "get_scientific_name" },
    max_tokens: 4096,
  });

  const message = response.choices[0].message;
  console.log(message);

  const text = response;

  return {
    text,
  };
};
