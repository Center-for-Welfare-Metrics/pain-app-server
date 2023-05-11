import { Schema } from "mongoose";

export const SymptomSchema = new Schema({
  name: { type: String },
  comments: { type: String },
  duration_min: { type: Number },
  duration_max: { type: Number },
  time_unit: { type: Schema.Types.ObjectId, ref: "rd_2_unit_of_measurement" },
  time_started: { type: Date },
});
