import mongoose from "mongoose";
const { Schema } = mongoose;
import { TrackSchema } from "../episode structure/track";
import { DurationSchema } from "../episode structure/duration";

export type IBurden = {
  productionSystemId: string;
  userId: string;
  name: string;
  harm: string;
  start_date: Date;
  location: number[];
  comments: string;
  tracks: any[];
  durations: any[];
  segment_names: string[];
  resume: any;
  occurrences: {
    min: number;
    max: number;
  };
  prevalence: {
    min: number;
    max: number;
  };
  order: number;
  color: string;
  mode: string;
};

const schemaProperties = {
  productionSystemId: { type: Schema.Types.ObjectId, ref: "production_system" },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: false },
  harm: { type: String, required: false },
  start_date: { type: Date, required: false },
  location: { type: [Number], required: false },
  comments: { type: String, required: false },
  tracks: [TrackSchema],
  durations: [DurationSchema],
  segment_names: [String],
  resume: { type: Object },
  occurrences: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 1 },
  },
  prevalence: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 1 },
  },
  order: { type: Number, required: false },
  color: { type: Schema.Types.ObjectId, ref: "harm_type" },
  mode: { type: String, default: "chance" },
};

export const burdenSchema = new Schema(schemaProperties);

export const BurdenModel = mongoose.model("burden", burdenSchema);
