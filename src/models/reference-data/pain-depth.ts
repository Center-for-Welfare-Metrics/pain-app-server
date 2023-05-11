import { model, Schema } from "mongoose";

const schemaProperties = {
  name: { type: String, required: false },
  description: { type: String, required: false },
  icon: { type: String, required: false },
  abbreviation: { type: String, required: false },
};

const depthSchema = new Schema(schemaProperties);

// Export both schema and model so schema may be reused in another collection later
export const PainDepthModel = model(
  "rd_1_pain_depth",
  depthSchema,
  "rd_1_pain_depth"
);
