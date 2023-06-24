import { getPromptAttributesById } from "@implementations/mongoose/prompt";
import { IAttributesConfig, PromptOptions } from "@models/prompt";

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

export const commonPromptAttributesConfigValidation = async (
  attributesConfig: IAttributesConfig,
  { req }
) => {
  const isAcceptable = [
    "label",
    "placeholder",
    "helperText",
    "isTextArea",
    "isRequired",
  ];

  const attributesConfigKeys = Object.keys(attributesConfig);

  const attributesConfigKeysAreValid = attributesConfigKeys.every((key) =>
    isAcceptable.includes(key)
  );

  if (!attributesConfigKeysAreValid) {
    throw new Error("attributesConfig keys are not valid");
  }

  const attributes = req.body?.attributes;
  let allKeys = [];
  if (!attributes) {
    const prompt_id = req.params?.prompt_id;
    const promptAttributes = await getPromptAttributesById({
      prompt_id,
    });
    allKeys = Object.keys(promptAttributes);
  } else {
    allKeys = Object.keys(attributes);
  }

  const labelKeys = Object.keys(attributesConfig.label ?? {});
  const labelKeysAreValid = labelKeys.every((key) => allKeys.includes(key));

  if (!labelKeysAreValid) {
    throw new Error("label keys are not valid");
  }

  const placeholderKeys = Object.keys(attributesConfig.placeholder ?? {});
  const placeholderKeysAreValid = placeholderKeys.every((key) =>
    allKeys.includes(key)
  );

  if (!placeholderKeysAreValid) {
    throw new Error("placeholder keys are not valid");
  }

  const helperTextKeys = Object.keys(attributesConfig.helperText ?? {});
  const helperTextKeysAreValid = helperTextKeys.every((key) =>
    allKeys.includes(key)
  );

  if (!helperTextKeysAreValid) {
    throw new Error("helperText keys are not valid");
  }

  const isTextAreaKeys = Object.keys(attributesConfig.isTextArea ?? {});
  const isTextAreaKeysAreValid = isTextAreaKeys.every((key) =>
    allKeys.includes(key)
  );

  if (!isTextAreaKeysAreValid) {
    throw new Error("isTextArea keys are not valid");
  }

  const isRequiredKeys = Object.keys(attributesConfig.isRequired ?? {});
  const isRequiredKeysAreValid = isRequiredKeys.every((key) =>
    allKeys.includes(key)
  );

  if (!isRequiredKeysAreValid) {
    throw new Error("isRequired keys are not valid");
  }

  return true;
};
