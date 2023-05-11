import { Schema } from "mongoose";

export const DepthSchema = new Schema({
  depth_id: { type: Schema.Types.ObjectId, ref: "rd_1_pain_depth" },
  name: { type: String },
  description: { type: String },
});
