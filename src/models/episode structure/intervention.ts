import mongoose, { Schema } from "mongoose";

export const InterventionSchema = new Schema({
  name: { type: String },
  comments: { type: String },
  duration_min: { type: Number },
  duration_max: { type: Number },
  time_unit: {
    type: Schema.Types.ObjectId,
    ref: "rd_2_unit_of_measurement",
    required: false,
  },
  time_started: { type: Date },
});
