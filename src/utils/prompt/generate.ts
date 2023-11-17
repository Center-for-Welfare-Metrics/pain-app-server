export const getPromptWithAttributes = (prompt: string, attributes: any) => {
  const promptWithAttributes = prompt.replace(
    /{{\s*([a-zA-Z0-9_]+)\s*}}/g,
    (_, attribute) => {
      return attributes[attribute];
    }
  );

  return promptWithAttributes;
};

export const finalInstructions = `use markdown to format the text, use # for main title and ## for subtitles, don't forget to generate the table only if requested above.`;
