import { Schema, model } from "mongoose";

const aiGeneratedSchema = new Schema(
  {
    prompt_id: { type: Schema.Types.ObjectId, ref: "prompt", required: true },
    attributes: { type: JSON, required: true },
    gptResponse: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const AiGeneretedModel = model("aigenerated", aiGeneratedSchema);
