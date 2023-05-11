import { Schema } from "mongoose";

export const PathDataSchema = new Schema({
  width: { type: Number, default: 160 },
  drawing: { type: String, required: false },
  justification: { type: String },
  name: { type: String },
  estimative_type: { type: Schema.Types.ObjectId, ref: "rd_1_estimative_type" },
  acute_or_chronic: { type: String },
});
