import { Schema, model } from "mongoose";

type CommonKeyStringPair = {
  [key: string]: string;
};

type CommonKeyBooleanPair = {
  [key: string]: boolean;
};

export type IAttributesConfig = {
  label: CommonKeyStringPair;
  placeholder: CommonKeyStringPair;
  helperText: CommonKeyStringPair;
  isTextArea: CommonKeyBooleanPair;
  isRequired: CommonKeyBooleanPair;
};

export type PromptOptions = {
  frequency_penalty?: number;
  presence_penalty?: number;
  temperature?: number;
  top_p?: number;
  isMain?: boolean;
};

type Prompt = {
  title: string;
  prompt: string;
  user: string;
  attributes?: CommonKeyStringPair;
  attributesConfig?: IAttributesConfig;
  options?: PromptOptions;
  isMain?: boolean;
};

const promptSchema = new Schema(
  {
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    attributes: { type: JSON, required: false },
    attributesConfig: { type: JSON, required: false },
    options: { type: JSON, required: false },
    isMain: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const PromptModel = model<Prompt>("prompt", promptSchema);
