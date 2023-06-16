import { PromptOptions } from "@models/prompt";

export const commonPromptOptionsValidation = (options: PromptOptions) => {
  if (
    options.frequency_penalty &&
    typeof options.frequency_penalty !== "number"
  ) {
    throw new Error("frequency_penalty must be a number");
  }
  if (
    options.presence_penalty &&
    typeof options.presence_penalty !== "number"
  ) {
    throw new Error("presence_penalty must be a number");
  }
  if (options.temperature && typeof options.temperature !== "number") {
    throw new Error("temperature must be a number");
  }
  if (options.top_p && typeof options.top_p !== "number") {
    throw new Error("top_p must be a number");
  }
  return true;
};
