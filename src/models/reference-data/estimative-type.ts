import { model, Schema } from "mongoose";

const schemaProperties = {
  name: { type: String, required: false },
  description: { type: String, required: false },
  abbreviation: { type: String, required: false },
};

const estimativeTypeSchema = new Schema(schemaProperties);

export const EstimativeTypeModel = model(
  "rd_1_estimative_type",
  estimativeTypeSchema,
  "rd_1_estimative_type"
);
