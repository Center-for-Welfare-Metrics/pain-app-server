import { Schema, model } from "mongoose";

export type PromptOptions = {
  frequency_penalty?: number;
  presence_penalty?: number;
  temperature?: number;
  top_p?: number;
};

const promptSchema = new Schema(
  {
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    attributes: { type: JSON, required: false },
    options: { type: JSON, required: false },
  },
  {
    timestamps: true,
  }
);

export const PromptModel = model("prompt", promptSchema);
