import { model, Schema } from "mongoose";

const schemaProperties = {
  name: { type: String, required: false },
  description: { type: String, required: false },
  icon: { type: String, required: false },
};

const acuteOrChronicSchema = new Schema(schemaProperties);

export const AcuteChronicModel = model(
  "rd_1_acute_or_chronic",
  acuteOrChronicSchema,
  "rd_1_acute_or_chronic"
);
