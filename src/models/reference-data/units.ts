import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaProperties = {
  name: { type: String, required: false },
  description: { type: String, required: false },
  abbreviation: { type: String, required: false },
  precedence: { type: Number, required: false },
};

const unitsSchema = new Schema(schemaProperties);

export const UnitsModel = mongoose.model(
  "rd_2_unit_of_measurement",
  unitsSchema,
  "rd_2_unit_of_measurement"
);
