import { Schema } from "mongoose";

export const DurationSchema = new Schema({
  time_started: { type: Date },
  duration_min: { type: Number },
  duration_max: { type: Number },
  time_unit: { type: Schema.Types.ObjectId, ref: "rd_2_unit_of_measurement" },
  unit: { type: Object },
  comments: { type: String },
});
