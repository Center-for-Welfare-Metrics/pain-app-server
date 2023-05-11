import mongoose from "mongoose";
import { Schema } from "mongoose";
import { TrackSchema } from "@models/episode structure/track";
import { DurationSchema } from "@models/episode structure/duration";

const schemaProperties = {
  patientId: { type: Schema.Types.ObjectId, ref: "patient" },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: false },
  harm: { type: String, required: false },
  startDate: { type: Date, required: false },
  location: { type: String, required: false },
  comments: { type: String, required: false },
  tracks: [TrackSchema],
  durations: [DurationSchema],
  resume: { type: Object },
  mode: { type: String, default: "chance" },
  segment_names: [{ type: String }],
};

export const EpisodeSchema = new Schema(schemaProperties, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

export const EpisodeModel = mongoose.model("episode", EpisodeSchema);
export const EpisodeSchemaProperties = schemaProperties;
