import { model, Schema } from "mongoose";

const schemaProperties = {
  name: { type: String, required: false },
  description: { type: String, required: false },
  abbreviation: { type: String, required: false },
  conv_factor: { type: String, required: false },
  color_code: { type: String, required: false },
  order: { type: Number, required: false },
};

const levelSchema = new Schema(schemaProperties);

export const PainLevelModel = model(
  "rd_1_pain_level",
  levelSchema,
  "rd_1_pain_level"
);
