import { Schema } from "mongoose";

export const TextureSchema = new Schema({
  texture_id: { type: Schema.Types.ObjectId, ref: "rd_1_pain_texture" },
  name: { type: String },
  description: { type: String },
});
