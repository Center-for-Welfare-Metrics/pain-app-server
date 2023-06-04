import { Schema, model } from "mongoose";

const promptSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    prompt: { type: String, required: true },
    attributes: { type: JSON, required: false },
  },
  {
    timestamps: true,
  }
);

export const PromptModel = model("prompt", promptSchema);
