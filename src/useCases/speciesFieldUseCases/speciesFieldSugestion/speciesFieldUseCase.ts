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

  const GPT_MODEL_TO_USE = "gpt-4-1106-preview";

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
        description: "Get scientific name",
        parameters: {
          type: "object",
          properties: {
            scientific_name: {
              type: "string",
              description: "the scientific name, e.g. Canis lupus familiaris",
            },
            others_names: {
              type: "array",
              description: "another possibility for the species name.",
              items: {
                type: "string",
              },
            },
          },
          required: ["scientific_name", "others_names"],
        },
      },
    ],
    function_call: { name: "get_scientific_name" },
    max_tokens: 192,
    temperature: 0.1,
  });
  return JSON.parse(response.choices[0].message.function_call.arguments);
};
