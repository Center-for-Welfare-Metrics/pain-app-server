import { Schema, model } from "mongoose";
import { SegmentSchema } from "./segment";

export const TrackSchema = new Schema({
  name: { type: String },
  description: { type: String },
  physical_or_psychological: { type: String },
  segments: [SegmentSchema],
  resume: { type: Object },
});

export const TrackModel = model("Track", TrackSchema);
