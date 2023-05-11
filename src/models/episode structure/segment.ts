import mongoose, { Schema } from "mongoose";
import { PainLevelSchema } from "./pain_level";
import { PathDataSchema } from "./path_data";
import { DurationSchema } from "./duration";
import { SymptomSchema } from "./symptom";
import { InterventionSchema } from "./intervention";
// import { Anatomy } from './anatomy';
import { DepthSchema } from "./depth";
import { TextureSchema } from "./texture";

export const SegmentSchema = new Schema({
  painLevel: PainLevelSchema,
  pathData: PathDataSchema,
  duration: DurationSchema,
  symptoms: [SymptomSchema],
  interventions: [InterventionSchema],
  anatomies: [String],
  depths: [DepthSchema],
  textures: [TextureSchema],
});

export const SegmentModel = mongoose.model("segment", SegmentSchema);
