import { model, Schema } from "mongoose";

const schemaProperties = {
  name: { type: String, required: false },
  description: { type: String, required: false },
  icon: { type: String, required: false },
  abbreviation: { type: String, required: false },
};

const textureSchema = new Schema(schemaProperties);

export const TextureModel = model(
  "rd_1_pain_texture",
  textureSchema,
  "rd_1_pain_texture"
);
