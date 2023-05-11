import { Schema } from "mongoose";

export const PainLevelSchema = new Schema({
  excruciating: { type: Number, default: 0 },
  disabling: { type: Number, default: 0 },
  hurtful: { type: Number, default: 0 },
  annoying: { type: Number, default: 0 },
  no_pain: { type: Number, default: 0 },
  justification: { type: String },
  estimative_type: { type: Schema.Types.ObjectId, ref: "rd_1_estimative_type" },
  acute_or_chronic: { type: String },
});
